import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradingformRubricCriteriaId, gradingformRubricCriteriaIdSchema, gradingformRubricCriterias } from "@/lib/db/schema/gradingformRubricCriterias";

export const getGradingformRubricCriterias = async () => {
  const rows = await db.select().from(gradingformRubricCriterias);
  const g = rows
  return { gradingformRubricCriterias: g };
};

export const getGradingformRubricCriteriaById = async (id: GradingformRubricCriteriaId) => {
  const { id: gradingformRubricCriteriaId } = gradingformRubricCriteriaIdSchema.parse({ id });
  const [row] = await db.select().from(gradingformRubricCriterias).where(eq(gradingformRubricCriterias.id, gradingformRubricCriteriaId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformRubricCriteria: g };
};


