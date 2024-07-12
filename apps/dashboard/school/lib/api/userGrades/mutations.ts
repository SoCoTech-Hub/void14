import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type UserGradeId, 
  type NewUserGradeParams,
  type UpdateUserGradeParams, 
  updateUserGradeSchema,
  insertUserGradeSchema, 
  userGrades,
  userGradeIdSchema 
} from "@/lib/db/schema/userGrades";
import { getUserAuth } from "@/lib/auth/utils";

export const createUserGrade = async (userGrade: NewUserGradeParams) => {
  const { session } = await getUserAuth();
  const newUserGrade = insertUserGradeSchema.parse({ ...userGrade, userId: session?.user.id! });
  try {
    const [u] =  await db.insert(userGrades).values(newUserGrade).returning();
    return { userGrade: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserGrade = async (id: UserGradeId, userGrade: UpdateUserGradeParams) => {
  const { session } = await getUserAuth();
  const { id: userGradeId } = userGradeIdSchema.parse({ id });
  const newUserGrade = updateUserGradeSchema.parse({ ...userGrade, userId: session?.user.id! });
  try {
    const [u] =  await db
     .update(userGrades)
     .set(newUserGrade)
     .where(and(eq(userGrades.id, userGradeId!), eq(userGrades.userId, session?.user.id!)))
     .returning();
    return { userGrade: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserGrade = async (id: UserGradeId) => {
  const { session } = await getUserAuth();
  const { id: userGradeId } = userGradeIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userGrades).where(and(eq(userGrades.id, userGradeId!), eq(userGrades.userId, session?.user.id!)))
    .returning();
    return { userGrade: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

