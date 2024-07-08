import { db } from "@soco/workshop-db/index";
import { eq } from "drizzle-orm";
import { type WorkshopAssessmentId, workshopAssessmentIdSchema, workshopAssessments } from "@soco/workshop-db/schema/workshopAssessments";

export const getWorkshopAssessments = async () => {
  const rows = await db.select().from(workshopAssessments);
  const w = rows
  return { workshopAssessments: w };
};

export const getWorkshopAssessmentById = async (id: WorkshopAssessmentId) => {
  const { id: workshopAssessmentId } = workshopAssessmentIdSchema.parse({ id });
  const [row] = await db.select().from(workshopAssessments).where(eq(workshopAssessments.id, workshopAssessmentId));
  if (row === undefined) return {};
  const w = row;
  return { workshopAssessment: w };
};


