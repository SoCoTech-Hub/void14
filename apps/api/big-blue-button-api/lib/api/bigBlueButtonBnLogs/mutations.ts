import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  BigBlueButtonBnLogId,
  bigBlueButtonBnLogIdSchema,
  bigBlueButtonBnLogs,
  insertBigBlueButtonBnLogSchema,
  NewBigBlueButtonBnLogParams,
  UpdateBigBlueButtonBnLogParams,
  updateBigBlueButtonBnLogSchema,
} from "../../db/schema/bigBlueButtonBnLogs";

export const createBigBlueButtonBnLog = async (
  bigBlueButtonBnLog: NewBigBlueButtonBnLogParams,
) => {
  const { session } = await getUserAuth();
  const newBigBlueButtonBnLog = insertBigBlueButtonBnLogSchema.parse({
    ...bigBlueButtonBnLog,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(bigBlueButtonBnLogs)
      .values(newBigBlueButtonBnLog)
      .returning();
    return { bigBlueButtonBnLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBigBlueButtonBnLog = async (
  id: BigBlueButtonBnLogId,
  bigBlueButtonBnLog: UpdateBigBlueButtonBnLogParams,
) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnLogId } = bigBlueButtonBnLogIdSchema.parse({ id });
  const newBigBlueButtonBnLog = updateBigBlueButtonBnLogSchema.parse({
    ...bigBlueButtonBnLog,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(bigBlueButtonBnLogs)
      .set({ ...newBigBlueButtonBnLog, updatedAt: new Date() })
      .where(
        and(
          eq(bigBlueButtonBnLogs.id, bigBlueButtonBnLogId!),
          eq(bigBlueButtonBnLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bigBlueButtonBnLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBigBlueButtonBnLog = async (id: BigBlueButtonBnLogId) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnLogId } = bigBlueButtonBnLogIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(bigBlueButtonBnLogs)
      .where(
        and(
          eq(bigBlueButtonBnLogs.id, bigBlueButtonBnLogId!),
          eq(bigBlueButtonBnLogs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bigBlueButtonBnLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
