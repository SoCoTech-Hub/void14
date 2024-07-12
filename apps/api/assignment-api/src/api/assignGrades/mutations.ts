import { db } from "@soco/assignment-db/client";
import { and, eq } from "@soco/assignment-db";
import { 
  type AssignGradeId, 
  type NewAssignGradeParams,
  type UpdateAssignGradeParams, 
  updateAssignGradeSchema,
  insertAssignGradeSchema, 
  assignGrades,
  assignGradeIdSchema 
} from "@soco/assignment-db/schema/assignGrades";
import { getUserAuth } from "@soco/auth-service";

export const createAssignGrade = async (assignGrade: NewAssignGradeParams) => {
  const { session } = await getUserAuth();
  const newAssignGrade = insertAssignGradeSchema.parse({ ...assignGrade, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(assignGrades).values(newAssignGrade).returning();
    return { assignGrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignGrade = async (id: AssignGradeId, assignGrade: UpdateAssignGradeParams) => {
  const { session } = await getUserAuth();
  const { id: assignGradeId } = assignGradeIdSchema.parse({ id });
  const newAssignGrade = updateAssignGradeSchema.parse({ ...assignGrade, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(assignGrades)
     .set({...newAssignGrade, updatedAt: new Date() })
     .where(and(eq(assignGrades.id, assignGradeId!), eq(assignGrades.userId, session?.user.id!)))
     .returning();
    return { assignGrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignGrade = async (id: AssignGradeId) => {
  const { session } = await getUserAuth();
  const { id: assignGradeId } = assignGradeIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignGrades).where(and(eq(assignGrades.id, assignGradeId!), eq(assignGrades.userId, session?.user.id!)))
    .returning();
    return { assignGrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

