import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { prisma } from "~/lib/prisma";

const questionWithAnswersSchema = z.array(
  z.object({
    id: z.number(),
    option: z.number().min(-2).max(2),
    weighting: z.number().min(0).max(3),
    text: z.string(),
  })
);

export async function POST(
  request: Request,
  { params }: { params: { hash: string } }
) {
  const data = await request.json();
  const hash = params.hash;

  try {
    const validatedData = questionWithAnswersSchema.parse(data);

    await prisma.candidateQuestionAnswer.deleteMany({
      where: {
        candidate: {
          hash,
        },
      },
    });

    const candidate = await prisma.candidate.update({
      where: {
        hash,
      },
      data: {
        hasFinished: true,
        answers: {
          createMany: {
            data: validatedData.map((answer) => ({
              questionId: answer.id,
              option: answer.option,
              weighting: answer.weighting,
              text: answer.text,
            })),
          },
        },
      },
    });

    return NextResponse.json({ slug: candidate.slug });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return NextResponse.json({
        error: "Es ist ein Fehler passiert. Bitte probieren Sie es nochmal!",
      });
  }
}
