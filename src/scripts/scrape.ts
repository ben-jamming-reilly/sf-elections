import "dotenv/config";

import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { Candidate, Question } from "@prisma/client";
import { prisma } from "../lib/prisma";

import { mayorElectionCandidates } from "./data/mayor";
import { ElectionCandidateSrc, CandidateSrc } from "./types";

const llm = new ChatOpenAI({ model: "gpt-4o" });

const crawl = new FirecrawlApp({
  apiUrl: process.env.FIRE_CRAWL_URL,
  apiKey: "",
});

const policySchema = z.object({
  policies: z.array(
    z.object({
      opinion: z
        .string()
        .describe(
          "A specific policy opinion which should be simple and not include any mention of the candidate.",
        ),

      topic: z
        .string()
        .describe(
          "A specific topic for political policy. Some examples [Homelessness, Public Safety, Housing, Education, Public Transit, Business, Taxes, Drugs, Environment, Ethics, Arts, Justice Reform, Other]",
        ),
    }),
  ),
});

type Policies = z.infer<typeof policySchema>["policies"];

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

const candidateQuestionSchema = z.object({
  questions: z.array(
    z.object({
      title: z.string(),
      category: z.string(),
    }),
  ),
});

type Questions = z.infer<typeof candidateQuestionSchema>["questions"];

const questionPrompt = ChatPromptTemplate.fromTemplate(`
  Below are a list of policies from each candidate in an election.
  {context}
  Generate a list of around 10 questions. The questions should be contraversial among the candidates.
  Each question should be in simple language, specific to certain topic, and should be answerable with a yes or no.
`);

const questionsChain = questionPrompt.pipe(
  llm.withStructuredOutput(candidateQuestionSchema),
);

const answerQuestionSchema = z.object({
  answers: z.array(
    z.object({
      option: z.enum(["Yes", "Not Sure", "No"]),
      weighting: z
        .enum([
          "very important",
          "important",
          "not so important",
          "does not matter",
        ])
        .describe(
          "This is suppose to be how important an issue this is to the candidate",
        ),
      reasoning: z.string(),
      simplerReasoning: z.string(),
    }),
  ),
});

const answerPrompt = ChatPromptTemplate.fromTemplate(`
  Below are the policies from the candidate {name}:
  {policies}
  Below are questions that the candidate needs to anwser:
  {questions}
  Anwser the questions for the candidate based on their opinions.
`);

const answerChain = answerPrompt.pipe(
  llm.withStructuredOutput(answerQuestionSchema),
);

type CandidateWithPolicies = {
  candidate: CandidateSrc;
  policies: Policies;
};

async function scrapeCandidates(candidates: CandidateSrc[]) {
  // Scrape all of the candidates
  const allPolicies = await Promise.all(
    candidates.map((candidate) => scrapeCandidatePolicies(candidate)),
  );

  let policiesText = "";

  // Pair each candidate with their Policies
  const candidatePolicies: CandidateWithPolicies[] = [];
  for (let idx = 0; idx < candidates.length; idx++) {
    const candidate = candidates[idx];
    const policies = allPolicies[idx];
    candidatePolicies.push({ candidate, policies });

    // A bullet point list of policies
    const text = policies
      .flat()
      .map((policy) => `- ${policy.opinion}\n  Topic: ${policy.topic}`)
      .join("\n");

    // Candidate with their policies
    policiesText += `${candidate.name}:\n${text}\n`;
  }

  // Just log the policies
  console.log(policiesText);

  // Generate Questions from all Policies at once
  const questionsRes = await questionsChain.invoke({
    context: policiesText,
  });
  const questions = questionsRes.questions;

  // Each Canidate Anwser the Generated Questions
  for (const { candidate, policies } of candidatePolicies) {
    const answersRes = await answerChain.invoke({
      name: candidate.name,
      policies: policies
        .map((policy) => `- ${policy.opinion}\n  Topic: ${policy.topic}`)
        .join("\n"),
      questions: questions.map((question) => `- ${question.title}`).join("\n"),
    });
    const answers = answersRes.answers;
    // console.log(candidate.name, JSON.stringify(answers, null, 2));
  }
}

scrapeCandidates(mayorElectionCandidates.candidates);

// scrape(mayorElectionCandidates);
