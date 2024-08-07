import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type GradeOutcomeId, 
  type NewGradeOutcomeParams,
  type UpdateGradeOutcomeParams, 
  updateGradeOutcomeSchema,
  insertGradeOutcomeSchema, 
  gradeOutcomes,
  gradeOutcomeIdSchema 
} from "@/lib/db/schema/gradeOutcomes";
import { getUserAuth } from "@/lib/auth/utils";

export const createGradeOutcome = async (gradeOutcome: NewGradeOutcomeParams) => {
  const { session } = await getUserAuth();
  const newGradeOutcome = insertGradeOutcomeSchema.parse({ ...gradeOutcome, userId: session?.user.id! });
  try {
    const [g] =  await db.insert(gradeOutcomes).values(newGradeOutcome).returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeOutcome = async (id: GradeOutcomeId, gradeOutcome: UpdateGradeOutcomeParams) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomeId } = gradeOutcomeIdSchema.parse({ id });
  const newGradeOutcome = updateGradeOutcomeSchema.parse({ ...gradeOutcome, userId: session?.user.id! });
  try {
    const [g] =  await db
     .update(gradeOutcomes)
     .set({...newGradeOutcome, updatedAt: new Date() })
     .where(and(eq(gradeOutcomes.id, gradeOutcomeId!), eq(gradeOutcomes.userId, session?.user.id!)))
     .returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeOutcome = async (id: GradeOutcomeId) => {
  const { session } = await getUserAuth();
  const { id: gradeOutcomeId } = gradeOutcomeIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeOutcomes).where(and(eq(gradeOutcomes.id, gradeOutcomeId!), eq(gradeOutcomes.userId, session?.user.id!)))
    .returning();
    return { gradeOutcome: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

