import type {
  EnrolLtiUserId,
  NewEnrolLtiUserParams,
  UpdateEnrolLtiUserParams,
} from "@soco/enrol-db/schema/enrolLtiUsers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolLtiUserIdSchema,
  enrolLtiUsers,
  insertEnrolLtiUserSchema,
  updateEnrolLtiUserSchema,
} from "@soco/enrol-db/schema/enrolLtiUsers";

export const createEnrolLtiUser = async (
  enrolLtiUser: NewEnrolLtiUserParams,
) => {
  const { session } = await getUserAuth();
  const newEnrolLtiUser = insertEnrolLtiUserSchema.parse({
    ...enrolLtiUser,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(enrolLtiUsers)
      .values(newEnrolLtiUser)
      .returning();
    return { enrolLtiUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolLtiUser = async (
  id: EnrolLtiUserId,
  enrolLtiUser: UpdateEnrolLtiUserParams,
) => {
  const { session } = await getUserAuth();
  const { id: enrolLtiUserId } = enrolLtiUserIdSchema.parse({ id });
  const newEnrolLtiUser = updateEnrolLtiUserSchema.parse({
    ...enrolLtiUser,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(enrolLtiUsers)
      .set({ ...newEnrolLtiUser, updatedAt: new Date() })
      .where(
        and(
          eq(enrolLtiUsers.id, enrolLtiUserId!),
          eq(enrolLtiUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { enrolLtiUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolLtiUser = async (id: EnrolLtiUserId) => {
  const { session } = await getUserAuth();
  const { id: enrolLtiUserId } = enrolLtiUserIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(enrolLtiUsers)
      .where(
        and(
          eq(enrolLtiUsers.id, enrolLtiUserId!),
          eq(enrolLtiUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { enrolLtiUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
