import { eq } from "drizzle-orm";

import type { WorkshopAssessmentId } from "../db/schema/workshopAssessments";
import { db } from "../db/index";
import {
  workshopAssessmentIdSchema,
  workshopAssessments,
} from "../db/schema/workshopAssessments";

export const getWorkshopAssessments = async () => {
  const rows = await db.select().from(workshopAssessments);
  const w = rows;
  return { workshopAssessments: w };
};

export const getWorkshopAssessmentById = async (id: WorkshopAssessmentId) => {
  const { id: workshopAssessmentId } = workshopAssessmentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(workshopAssessments)
    .where(eq(workshopAssessments.id, workshopAssessmentId));
  if (row === undefined) return {};
  const w = row;
  return { workshopAssessment: w };
};
