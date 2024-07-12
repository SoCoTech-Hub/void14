import type { GradingInstanceId } from "@soco/grade-db/schema/gradingInstances";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingInstanceIdSchema,
  gradingInstances,
} from "@soco/grade-db/schema/gradingInstances";

export const getGradingInstances = async () => {
  const rows = await db.select().from(gradingInstances);
  const g = rows;
  return { gradingInstances: g };
};

export const getGradingInstanceById = async (id: GradingInstanceId) => {
  const { id: gradingInstanceId } = gradingInstanceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingInstances)
    .where(eq(gradingInstances.id, gradingInstanceId));
  if (row === undefined) return {};
  const g = row;
  return { gradingInstance: g };
};
