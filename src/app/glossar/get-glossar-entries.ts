import { unstable_cache } from "next/cache";
import { prisma } from "~/lib/prisma";

export const getGlossarEntries = unstable_cache(
  async () => {
    return prisma.glossarEntry.findMany();
  },
  ["glossarEntries"],
  {
    revalidate: 18000,
  },
);
