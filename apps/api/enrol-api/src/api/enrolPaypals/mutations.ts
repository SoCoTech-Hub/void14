import type {
  EnrolPaypalId,
  NewEnrolPaypalParams,
  UpdateEnrolPaypalParams,
} from "@soco/enrol-db/schema/enrolPaypals";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/enrol-db";
import { db } from "@soco/enrol-db/client";
import {
  enrolPaypalIdSchema,
  enrolPaypals,
  insertEnrolPaypalSchema,
  updateEnrolPaypalSchema,
} from "@soco/enrol-db/schema/enrolPaypals";

export const createEnrolPaypal = async (enrolPaypal: NewEnrolPaypalParams) => {
  const { session } = await getUserAuth();
  const newEnrolPaypal = insertEnrolPaypalSchema.parse({
    ...enrolPaypal,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(enrolPaypals)
      .values(newEnrolPaypal)
      .returning();
    return { enrolPaypal: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEnrolPaypal = async (
  id: EnrolPaypalId,
  enrolPaypal: UpdateEnrolPaypalParams,
) => {
  const { session } = await getUserAuth();
  const { id: enrolPaypalId } = enrolPaypalIdSchema.parse({ id });
  const newEnrolPaypal = updateEnrolPaypalSchema.parse({
    ...enrolPaypal,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(enrolPaypals)
      .set({ ...newEnrolPaypal, updatedAt: new Date() })
      .where(
        and(
          eq(enrolPaypals.id, enrolPaypalId!),
          eq(enrolPaypals.userId, session?.user.id!),
        ),
      )
      .returning();
    return { enrolPaypal: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEnrolPaypal = async (id: EnrolPaypalId) => {
  const { session } = await getUserAuth();
  const { id: enrolPaypalId } = enrolPaypalIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(enrolPaypals)
      .where(
        and(
          eq(enrolPaypals.id, enrolPaypalId!),
          eq(enrolPaypals.userId, session?.user.id!),
        ),
      )
      .returning();
    return { enrolPaypal: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
