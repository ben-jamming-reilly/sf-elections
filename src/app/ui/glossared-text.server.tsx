import { GlossaredText } from "./glossared-text";
import { getGlossarEntries } from "../glossar/get-glossar-entries";

export const GlossaredTextServer = async ({ text }: { text: string }) => {
  const glossarEntries = await getGlossarEntries();

  return <GlossaredText text={text} glossarEntries={glossarEntries} />;
};
