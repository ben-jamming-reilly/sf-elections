import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError, z } from "zod";
import { getCandidatesWithQuestions } from "~/app/wahlkabine/[slug]/get-candidates-with-questions";
import { rateCandidate } from "~/app/wahlkabine/[slug]/rate-candidates";
import { getVoterViaHash } from "~/app/wahlkabine/get-voter-via-hash";
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
  ])
);

export async function POST(request: Request) {
  const data = await request.json();
  const hash = uuidv4().slice(0, 8);

  try {
    const validatedData = questionWithAnswersSchema.parse(data);

    const candidates = await getCandidatesWithQuestions();

    const voter = await prisma.voter.create({
      data: {
        hash: hash,
        answers: {
          createMany: {
            data: validatedData.map((answer) => ({
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
    });

    await prisma.voterCandidateMatch.createMany({
      data: candidates.map((candidate) => ({
        candidateId: candidate.id,
        voterId: voter.id,
        scorePercentageRaw: rateCandidate(voter.answers, candidate)
          .scorePercentageRaw,
      })),
    });

    return NextResponse.json({ slug: voter.hash });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return NextResponse.json({
        error: "Es ist ein Fehler passiert. Bitte probiere es nochmal!",
      });
  }
}
