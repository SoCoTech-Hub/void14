import { eq } from "drizzle-orm";

import type { GradingformGuideCommentId } from "../../db/schema/gradingformGuideComments";
import { db } from "../../db/index";
import {
  gradingformGuideCommentIdSchema,
  gradingformGuideComments,
} from "../../db/schema/gradingformGuideComments";

export const getGradingformGuideComments = async () => {
  const rows = await db.select().from(gradingformGuideComments);
  const g = rows;
  return { gradingformGuideComments: g };
};

export const getGradingformGuideCommentById = async (
  id: GradingformGuideCommentId,
) => {
  const { id: gradingformGuideCommentId } =
    gradingformGuideCommentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingformGuideComments)
    .where(eq(gradingformGuideComments.id, gradingformGuideCommentId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformGuideComment: g };
};
