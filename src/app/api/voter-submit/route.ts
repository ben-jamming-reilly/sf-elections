import { headers } from "next/headers";
import { NextResponse, userAgent } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError, z } from "zod";
import { getCandidatesWithQuestions } from "~/app/[electionSlug]/fragen/[slug]/get-candidates-with-questions";
import { rateCandidate } from "~/app/[electionSlug]/fragen/[slug]/rate-candidates";
import { trackPlausibleEvent } from "~/lib/plausible";
import { prisma } from "~/lib/prisma";

const questionWithAnswersSchema = z.array(
  z.discriminatedUnion("skipped", [
    z.object({
      id: z.number(),
      option: z.null(),
      weighting: z.null(),
      skipped: z.literal(true),
    }),
    z.object({
      id: z.number(),
      option: z.number(),
      weighting: z.number().min(0).max(3),
      skipped: z.literal(false),
    }),
  ]),
);

export async function POST(request: Request) {
  const data = await request.json();
  const { ua } = userAgent(request);
  const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(
    ",",
  )[0];
  const hash = uuidv4().slice(0, 8);

  try {
    const validatedQuestionsWithAnswers = questionWithAnswersSchema.parse(
      data.questionsWithAnswers,
    );

    const questionId = validatedQuestionsWithAnswers?.[0]?.id;

    if (!questionId) {
      return NextResponse.json(
        { error: "No questionId found" },
        { status: 400 },
      );
    }

    const questionWithElection = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        election: true,
      },
    });

    if (!questionWithElection?.election?.id) {
      return NextResponse.json(
        { error: "Election not found" },
        { status: 400 },
      );
    }

    const [voter, candidates] = await Promise.all([
      prisma.voter.create({
        data: {
          hash: hash,
          hasAcceptedTos: true,
          electionId: questionWithElection.election.id,
          answers: {
            createMany: {
              data: validatedQuestionsWithAnswers.map((answer) => ({
                questionId: answer.id,
                option: answer.option,
                weighting: answer.weighting,
                skipped: answer.skipped,
              })),
            },
          },
        },
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
      }),
      getCandidatesWithQuestions(),
      trackPlausibleEvent({
        event: "Fragebogen abgeschickt",
        url: request.url,
        ip: ip,
        userAgent: ua,
      }),
    ]);

    // calculate the rating for each candidate
    await prisma.voterCandidateMatch.createMany({
      data: candidates.map((candidate) => ({
        candidateId: candidate.id,
        voterId: voter.id,
        score: rateCandidate(voter.answers, candidate).score,
      })),
    });

    return NextResponse.json({ slug: voter.hash });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues });
    }

    return NextResponse.json(
      {
        error: "Es ist ein Fehler passiert. Bitte probiere es nochmal!",
      },
      { status: 400 },
    );
  }
}
