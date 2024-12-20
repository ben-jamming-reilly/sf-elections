import { prisma } from "~/lib/prisma";

export const GET = async (request: Request) => {
  try {
    const data = await prisma.candidate.findMany();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

export const revalidate = 0;
