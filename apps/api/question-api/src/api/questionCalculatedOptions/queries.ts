import { db } from "@soco/question-db/index";
import { eq } from "drizzle-orm";
import { type QuestionCalculatedOptionId, questionCalculatedOptionIdSchema, questionCalculatedOptions } from "@soco/question-db/schema/questionCalculatedOptions";
import { questions } from "@soco/question-db/schema/questions";

export const getQuestionCalculatedOptions = async () => {
  const rows = await db.select({ questionCalculatedOption: questionCalculatedOptions, question: questions }).from(questionCalculatedOptions).leftJoin(questions, eq(questionCalculatedOptions.questionId, questions.id));
  const q = rows .map((r) => ({ ...r.questionCalculatedOption, question: r.question})); 
  return { questionCalculatedOptions: q };
};

export const getQuestionCalculatedOptionById = async (id: QuestionCalculatedOptionId) => {
  const { id: questionCalculatedOptionId } = questionCalculatedOptionIdSchema.parse({ id });
  const [row] = await db.select({ questionCalculatedOption: questionCalculatedOptions, question: questions }).from(questionCalculatedOptions).where(eq(questionCalculatedOptions.id, questionCalculatedOptionId)).leftJoin(questions, eq(questionCalculatedOptions.questionId, questions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionCalculatedOption, question: row.question } ;
  return { questionCalculatedOption: q };
};


