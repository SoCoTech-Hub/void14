import { eq } from "drizzle-orm";

import type { QuestionSetReferenceId } from "../../db/schema/questionSetReferences";
import { db } from "../../db/index";
import {
  questionSetReferenceIdSchema,
  questionSetReferences,
} from "../../db/schema/questionSetReferences";

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
