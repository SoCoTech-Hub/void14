import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradeCategoryId, gradeCategoryIdSchema, gradeCategories } from "@/lib/db/schema/gradeCategories";

export const getGradeCategories = async () => {
  const rows = await db.select().from(gradeCategories);
  const g = rows
  return { gradeCategories: g };
};

export const getGradeCategoryById = async (id: GradeCategoryId) => {
  const { id: gradeCategoryId } = gradeCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(gradeCategories).where(eq(gradeCategories.id, gradeCategoryId));
  if (row === undefined) return {};
  const g = row;
  return { gradeCategory: g };
};


