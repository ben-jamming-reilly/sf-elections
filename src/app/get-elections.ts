import { cache } from "react";
import { prisma } from "~/lib/prisma";

export const getElections = cache(async () => {
  return await prisma.election.findMany();
});
