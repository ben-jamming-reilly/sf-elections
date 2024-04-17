import { prisma } from "~/lib/prisma";
import { GlossaredText } from "./glossared-text";
import { cache } from "react";

const getGlossarEntries = cache(async () => prisma.glossarEntry.findMany());

export const GlossaredTextServer = async ({ text }: { text: string }) => {
  const glossarEntries = await getGlossarEntries();

  return <GlossaredText text={text} glossarEntries={glossarEntries} />;
};
