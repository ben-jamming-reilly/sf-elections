import { GlossaredText } from "./glossared-text";
import { getGlossarEntries } from "../glossar/page";

export const GlossaredTextServer = async ({ text }: { text: string }) => {
  const glossarEntries = await getGlossarEntries();

  return <GlossaredText text={text} glossarEntries={glossarEntries} />;
};
