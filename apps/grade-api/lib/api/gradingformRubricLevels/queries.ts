import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradingformRubricLevelId, gradingformRubricLevelIdSchema, gradingformRubricLevels } from "@/lib/db/schema/gradingformRubricLevels";

export const getGradingformRubricLevels = async () => {
  const rows = await db.select().from(gradingformRubricLevels);
  const g = rows
  return { gradingformRubricLevels: g };
};

export const getGradingformRubricLevelById = async (id: GradingformRubricLevelId) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse({ id });
  const [row] = await db.select().from(gradingformRubricLevels).where(eq(gradingformRubricLevels.id, gradingformRubricLevelId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformRubricLevel: g };
};


