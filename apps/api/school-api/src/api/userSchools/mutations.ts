import type {
  NewUserSchoolParams,
  UpdateUserSchoolParams,
  UserSchoolId,
} from "@soco/school-db/schema/userSchools";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/school-db";
import { db } from "@soco/school-db/client";
import {
  insertUserSchoolSchema,
  updateUserSchoolSchema,
  userSchoolIdSchema,
  userSchools,
} from "@soco/school-db/schema/userSchools";

export const createUserSchool = async (userSchool: NewUserSchoolParams) => {
  const { session } = await getUserAuth();
  const newUserSchool = insertUserSchoolSchema.parse({
    ...userSchool,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db.insert(userSchools).values(newUserSchool).returning();
    return { userSchool: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserSchool = async (
  id: UserSchoolId,
  userSchool: UpdateUserSchoolParams,
) => {
  const { session } = await getUserAuth();
  const { id: userSchoolId } = userSchoolIdSchema.parse({ id });
  const newUserSchool = updateUserSchoolSchema.parse({
    ...userSchool,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userSchools)
      .set(newUserSchool)
      .where(
        and(
          eq(userSchools.id, userSchoolId!),
          eq(userSchools.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userSchool: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserSchool = async (id: UserSchoolId) => {
  const { session } = await getUserAuth();
  const { id: userSchoolId } = userSchoolIdSchema.parse({ id });
  try {
    const [u] = await db
      .delete(userSchools)
      .where(
        and(
          eq(userSchools.id, userSchoolId!),
          eq(userSchools.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userSchool: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
