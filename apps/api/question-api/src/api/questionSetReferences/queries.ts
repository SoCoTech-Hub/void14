import type { QuestionSetReferenceId } from "@soco/question-db/schema/questionSetReferences";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  questionSetReferenceIdSchema,
  questionSetReferences,
} from "@soco/question-db/schema/questionSetReferences";

export const getQuestionSetReferences = async () => {
  const rows = await db.select().from(questionSetReferences);
  const q = rows;
  return { questionSetReferences: q };
};

export const getQuestionSetReferenceById = async (
  id: QuestionSetReferenceId,
) => {
  const { id: questionSetReferenceId } = questionSetReferenceIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(questionSetReferences)
    .where(eq(questionSetReferences.id, questionSetReferenceId));
  if (row === undefined) return {};
  const q = row;
  return { questionSetReference: q };
};
