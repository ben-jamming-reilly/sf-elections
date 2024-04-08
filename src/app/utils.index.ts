export const QuestionTypes = {
  YesNo: "YesNo",
} as const;

export type QuestionType = (typeof QuestionTypes)[keyof typeof QuestionTypes];
