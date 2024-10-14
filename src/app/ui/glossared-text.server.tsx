import { GlossaredText } from "./glossared-text";
import { getGlossarEntries } from "../glossary/get-glossar-entries";

export const GlossaredTextServer = async ({ text }: { text: string }) => {
  const glossarEntries = await getGlossarEntries();

  return <GlossaredText text={text} glossarEntries={glossarEntries} />;
};
