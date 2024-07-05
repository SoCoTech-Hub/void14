import { eq } from "drizzle-orm";

import type { GradingAreaId } from "../../db/schema/gradingAreas";
import { db } from "../../db/index";
import {
  gradingAreaIdSchema,
  gradingAreas,
} from "../../db/schema/gradingAreas";

export const getGradingAreas = async () => {
  const rows = await db.select().from(gradingAreas);
  const g = rows;
  return { gradingAreas: g };
};

export const getGradingAreaById = async (id: GradingAreaId) => {
  const { id: gradingAreaId } = gradingAreaIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(gradingAreas)
    .where(eq(gradingAreas.id, gradingAreaId));
  if (row === undefined) return {};
  const g = row;
  return { gradingArea: g };
};
