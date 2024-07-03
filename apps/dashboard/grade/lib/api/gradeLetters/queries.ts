import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type GradeLetterId, gradeLetterIdSchema, gradeLetters } from "@/lib/db/schema/gradeLetters";

export const getGradeLetters = async () => {
  const rows = await db.select().from(gradeLetters);
  const g = rows
  return { gradeLetters: g };
};

export const getGradeLetterById = async (id: GradeLetterId) => {
  const { id: gradeLetterId } = gradeLetterIdSchema.parse({ id });
  const [row] = await db.select().from(gradeLetters).where(eq(gradeLetters.id, gradeLetterId));
  if (row === undefined) return {};
  const g = row;
  return { gradeLetter: g };
};


