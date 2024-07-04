import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertMnetServiceEnrolEnrolmentSchema,
  MnetServiceEnrolEnrolmentId,
  mnetServiceEnrolEnrolmentIdSchema,
  mnetServiceEnrolEnrolments,
  NewMnetServiceEnrolEnrolmentParams,
  UpdateMnetServiceEnrolEnrolmentParams,
  updateMnetServiceEnrolEnrolmentSchema,
} from "../db/schema/mnetServiceEnrolEnrolments";

export const createMnetServiceEnrolEnrolment = async (
  mnetServiceEnrolEnrolment: NewMnetServiceEnrolEnrolmentParams,
) => {
  const { session } = await getUserAuth();
  const newMnetServiceEnrolEnrolment =
    insertMnetServiceEnrolEnrolmentSchema.parse({
      ...mnetServiceEnrolEnrolment,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .insert(mnetServiceEnrolEnrolments)
      .values(newMnetServiceEnrolEnrolment)
      .returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetServiceEnrolEnrolment = async (
  id: MnetServiceEnrolEnrolmentId,
  mnetServiceEnrolEnrolment: UpdateMnetServiceEnrolEnrolmentParams,
) => {
  const { session } = await getUserAuth();
  const { id: mnetServiceEnrolEnrolmentId } =
    mnetServiceEnrolEnrolmentIdSchema.parse({ id });
  const newMnetServiceEnrolEnrolment =
    updateMnetServiceEnrolEnrolmentSchema.parse({
      ...mnetServiceEnrolEnrolment,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .update(mnetServiceEnrolEnrolments)
      .set(newMnetServiceEnrolEnrolment)
      .where(
        and(
          eq(mnetServiceEnrolEnrolments.id, mnetServiceEnrolEnrolmentId!),
          eq(mnetServiceEnrolEnrolments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetServiceEnrolEnrolment = async (
  id: MnetServiceEnrolEnrolmentId,
) => {
  const { session } = await getUserAuth();
  const { id: mnetServiceEnrolEnrolmentId } =
    mnetServiceEnrolEnrolmentIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(mnetServiceEnrolEnrolments)
      .where(
        and(
          eq(mnetServiceEnrolEnrolments.id, mnetServiceEnrolEnrolmentId!),
          eq(mnetServiceEnrolEnrolments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { mnetServiceEnrolEnrolment: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
