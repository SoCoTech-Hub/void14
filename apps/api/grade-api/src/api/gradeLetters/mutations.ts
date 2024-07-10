import { db } from "@soco/grade-db/client";
import { eq } from "@soco/grade-db";
import { 
  GradeLetterId, 
  NewGradeLetterParams,
  UpdateGradeLetterParams, 
  updateGradeLetterSchema,
  insertGradeLetterSchema, 
  gradeLetters,
  gradeLetterIdSchema 
} from "@soco/grade-db/schema/gradeLetters";

export const createGradeLetter = async (gradeLetter: NewGradeLetterParams) => {
  const newGradeLetter = insertGradeLetterSchema.parse(gradeLetter);
  try {
    const [g] =  await db.insert(gradeLetters).values(newGradeLetter).returning();
    return { gradeLetter: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeLetter = async (id: GradeLetterId, gradeLetter: UpdateGradeLetterParams) => {
  const { id: gradeLetterId } = gradeLetterIdSchema.parse({ id });
  const newGradeLetter = updateGradeLetterSchema.parse(gradeLetter);
  try {
    const [g] =  await db
     .update(gradeLetters)
     .set(newGradeLetter)
     .where(eq(gradeLetters.id, gradeLetterId!))
     .returning();
    return { gradeLetter: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeLetter = async (id: GradeLetterId) => {
  const { id: gradeLetterId } = gradeLetterIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeLetters).where(eq(gradeLetters.id, gradeLetterId!))
    .returning();
    return { gradeLetter: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

