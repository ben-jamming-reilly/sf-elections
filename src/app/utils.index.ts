export const QuestionTypes = {
  YesNo: "YesNo",
} as const;

export type QuestionType = (typeof QuestionTypes)[keyof typeof QuestionTypes];

export const ElectionSlugs = ["eu-election-2024", "nr-election-2024"] as const;

export type ElectionSlugsType = (typeof ElectionSlugs)[number];

export const getValueFromRecord = <K extends string, V>(
  record: Record<K, V>,
  key: string,
  fallbackKey: K,
): V => {
  if (key in record) {
    return record[key as K]; // Type assertion to ensure K is the key type
  }
  return record[fallbackKey];
};

export const MAILERLITE_ACCOUNT_ID = "345641";

export const mailerliteFormIds = {
  "eu-election-2024": "118855395671279343",
  "nr-election-2024": "131626145349109020",
} satisfies Record<ElectionSlugsType, string>;

export const getMailerliteFormId = (
  electionSlug: string,
  fallbackSlug: ElectionSlugsType,
) => {
  return getValueFromRecord(mailerliteFormIds, electionSlug, fallbackSlug);
};
