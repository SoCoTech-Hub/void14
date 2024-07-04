import { eq } from "drizzle-orm";

import type { GradingInstanceId } from "../db/schema/gradingInstances";
import { db } from "../db/index";
import {
  gradingInstanceIdSchema,
  gradingInstances,
} from "../db/schema/gradingInstances";

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
