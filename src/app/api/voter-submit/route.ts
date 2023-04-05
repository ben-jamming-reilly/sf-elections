import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError, z } from "zod";
import { prisma } from "~/lib/prisma";

const questionWithAnswersSchema = z.array(
  z.object({
    id: z.number(),
    option: z.number().min(-2).max(2),
    weighting: z.number().min(0).max(3),
  })
);

export async function POST(request: Request) {
  const data = await request.json();
  const hash = uuidv4();
  console.log(data);

  try {
    const validatedData = questionWithAnswersSchema.parse(data);

    const voter = await prisma.voter.create({
      data: {
        hash: hash,
        answers: {
          createMany: {
            data: validatedData.map((answer) => ({
              questionId: answer.id,
              option: answer.option,
              weighting: answer.weighting,
            })),
          },
        },
      },
    });

    return NextResponse.json({ slug: voter.hash });
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
