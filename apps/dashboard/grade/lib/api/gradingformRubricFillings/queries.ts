import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradingformRubricFillingId, gradingformRubricFillingIdSchema, gradingformRubricFillings } from "@/lib/db/schema/gradingformRubricFillings";

export const getGradingformRubricFillings = async () => {
  const rows = await db.select().from(gradingformRubricFillings);
  const g = rows
  return { gradingformRubricFillings: g };
};

export const getGradingformRubricFillingById = async (id: GradingformRubricFillingId) => {
  const { id: gradingformRubricFillingId } = gradingformRubricFillingIdSchema.parse({ id });
  const [row] = await db.select().from(gradingformRubricFillings).where(eq(gradingformRubricFillings.id, gradingformRubricFillingId));
  if (row === undefined) return {};
  const g = row;
  return { gradingformRubricFilling: g };
};


