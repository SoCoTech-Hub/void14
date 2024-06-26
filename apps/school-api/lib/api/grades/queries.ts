import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradeId, gradeIdSchema, grades } from "@/lib/db/schema/grades";

export const getGrades = async () => {
  const rows = await db.select().from(grades);
  const g = rows
  return { grades: g };
};

export const getGradeById = async (id: GradeId) => {
  const { id: gradeId } = gradeIdSchema.parse({ id });
  const [row] = await db.select().from(grades).where(eq(grades.id, gradeId));
  if (row === undefined) return {};
  const g = row;
  return { grade: g };
};


