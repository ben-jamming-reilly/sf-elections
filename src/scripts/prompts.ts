import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

const llm = new ChatOpenAI({ model: "gpt-4o" });

// Scraping Policies Pages

export const policySchema = z.object({
  policies: z.array(
    z.object({
      opinion: z
        .string()
        .describe(
          "A specific policy opinion which should be simple and not include any mention of the candidate.",
        ),

      topic: z
        .string()
        .describe(
          "A specific topic for political policy. Some examples [Homelessness, Public Safety, Housing, Education, Public Transit, Business, Taxes, Drugs, Environment, Ethics, Arts, Justice Reform, Other]",
        ),
    }),
  ),
});

export type Policies = z.infer<typeof policySchema>["policies"];

// Generating Questions

const questionPrompt = ChatPromptTemplate.fromTemplate(`
  Below are a list of policies from each candidate in an election.
  {context}
  Generate a list of around 10 questions. The questions should be contraversial among the candidates.
  Each question should be in simple language, specific to certain topic, and should be answerable with a yes or no.
`);

export const candidateQuestionSchema = z.object({
  questions: z.array(
    z.object({
      title: z.string(),
      category: z.string(),
    }),
  ),
});

export const questionsChain = questionPrompt.pipe(
  llm.withStructuredOutput(candidateQuestionSchema),
);

// Answering Questions

const answerPrompt = ChatPromptTemplate.fromTemplate(`
  Below are the policies from the candidate {name}:
  {policies}
  Below are questions that the candidate needs to anwser:
  {questions}
  Answer the questions for the candidate based on their opinions.
`);

export const answerQuestionSchema = z.object({
  answers: z.array(
    z.object({
      option: z.enum(["Yes", "Not Sure", "No"]),
      weighting: z
        .enum([
          "very important",
          "important",
          "not so important",
          "does not matter",
        ])
        .describe(
          "This is suppose to be how important an issue this is to the candidate",
        ),
      reasoning: z.string(),
      simplerReasoning: z.string(),
    }),
  ),
});

export const answerChain = answerPrompt.pipe(
  llm.withStructuredOutput(answerQuestionSchema),
);
