import { db } from "@soco/grade-db/client";
import { eq } from "@soco/grade-db";
import { type GradingformGuideCommentId, gradingformGuideCommentIdSchema, gradingformGuideComments } from "@soco/grade-db/schema/gradingformGuideComments";

export const getGradingformGuideComments = async () => {
  const rows = await db.select().from(gradingformGuideComments);
  const g = rows
  return { gradingformGuideComments: g };
};

export const getGradingformGuideCommentById = async (id: GradingformGuideCommentId) => {
  const { id: gradingformGuideCommentId } = gradingformGuideCommentIdSchema.parse({ id });
  const [row] = await db.select().from(gradingformGuideComments).where(eq(gradingformGuideComments.id, gradingformGuideCommentId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformGuideComment: g };
};


