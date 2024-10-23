import "dotenv/config";
import FirecrawlApp from "@mendable/firecrawl-js";
import type { Candidate } from "@prisma/client";

import { prisma } from "../lib/prisma";
import { mayorElectionCandidates } from "./data/mayor";
import { CandidateSrc, ElectionCandidateSrc } from "./types";
import { answerChain, questionsChain, policySchema, Policies } from "./prompts";
import { clearData } from "./seed";

const crawl = new FirecrawlApp({
  apiUrl: process.env.FIRE_CRAWL_URL,
  apiKey: "",
});

async function scrapePolicies(url: string) {
  // Use the cached version
  const page = await prisma.pageCache.findUnique({ where: { url } });

  if (page) {
    const policies = policySchema.safeParse(page.policies);
    if (policies.data) return policies.data.policies;
  }

  const res = await crawl.scrapeUrl(url, {
    formats: ["extract"],
    extract: { schema: policySchema },
  });

  if (!res.success || !res.extract) throw new Error(res.error);

  const policies = res.extract;
  await prisma.pageCache.upsert({
    create: { policies, url },
    update: { policies },
    where: { url },
  });

  return policies.policies;
}

async function scrapeCandidatePolicies(candidate: CandidateSrc) {
  const allPolicies = await Promise.all(
    candidate.urls.map((url) => scrapePolicies(url)),
  );
  return allPolicies.flat();
}

type CandidateWithPolicies = {
  candidate: Candidate;
  policies: Policies;
};

async function scrapeElection(electionSrc: ElectionCandidateSrc) {
  // Save the election and candidates in the database
  const election = await prisma.election.create({
    data: {
      ...electionSrc,
      candidates: {
        createMany: {
          data: electionSrc.candidates.map((candidate) => ({
            name: candidate.name,
            description: candidate.description,
            hasFinished: candidate.hasFinished,
            profileImg: candidate.profileImg,
            slug: candidate.slug,
          })),
        },
      },
    },
    include: {
      candidates: true,
    },
  });

  // Scrape all of the candidates
  const allPolicies = await Promise.all(
    electionSrc.candidates.map((candidate) =>
      scrapeCandidatePolicies(candidate),
    ),
  );

  let allPoliciesContext = "";

  // Pair each candidate with their Policies
  const candidatePolicies: CandidateWithPolicies[] = [];

  for (let idx = 0; idx < election.candidates.length; idx++) {
    const candidate = election.candidates[idx];
    const policies = allPolicies[idx];
    candidatePolicies.push({ candidate, policies });

    // A bullet point list of policies
    const text = policies
      .flat()
      .map((policy) => `- ${policy.opinion}\n  Topic: ${policy.topic}`)
      .join("\n");

    allPoliciesContext += `${candidate.name}:\n${text}\n`;
  }

  // Just log the policies
  // Generate Questions from all Policies at once
  const questionsRes = await questionsChain.invoke({
    context: allPoliciesContext,
  });

  // Save the questions
  const questions = await prisma.question.createManyAndReturn({
    data: questionsRes.questions.map((question, order) => ({
      title: question.title,
      category: question.category,
      description: "",
      order: order,
      electionId: election.id,
    })),
  });

  const questionsText = questionsRes.questions
    .map((question) => `- ${question.title}`)
    .join("\n");

  // Have each candidate answer the questions
  await Promise.all(
    candidatePolicies.map(async ({ candidate, policies }) => {
      const policyText = policies
        .map((policy) => `- ${policy.opinion}\n  Topic: ${policy.topic}`)
        .join("\n");

      const answersRes = await answerChain.invoke({
        name: candidate.name,
        policies: policyText,
        questions: questionsText,
      });

      await prisma.candidateQuestionAnswer.createMany({
        data: answersRes.answers.map((answer, idx) => ({
          text: answer.reasoning,
          textSimpleLanguage: answer.simplerReasoning,
          candidateId: candidate.id,
          questionId: questions[idx].id,
          option:
            answer.option === "Yes" ? 1 : answer.option === "Not Sure" ? 0 : -1,
          weighting:
            answer.weighting === "very important"
              ? 3
              : answer.weighting === "important"
                ? 2
                : answer.weighting === "not so important"
                  ? 1
                  : 0,
        })),
      });
    }),
  );
}

(async () => {
  await clearData();
  await scrapeElection(mayorElectionCandidates);
})();
