import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/big-blue-button-db/index";
import {
  BigBlueButtonBnRecordingId,
  bigBlueButtonBnRecordingIdSchema,
  bigBlueButtonBnRecordings,
  insertBigBlueButtonBnRecordingSchema,
  NewBigBlueButtonBnRecordingParams,
  UpdateBigBlueButtonBnRecordingParams,
  updateBigBlueButtonBnRecordingSchema,
} from "@soco/big-blue-button-db/schema/bigBlueButtonBnRecordings";

export const createBigBlueButtonBnRecording = async (
  bigBlueButtonBnRecording: NewBigBlueButtonBnRecordingParams,
) => {
  const { session } = await getUserAuth();
  const newBigBlueButtonBnRecording =
    insertBigBlueButtonBnRecordingSchema.parse({
      ...bigBlueButtonBnRecording,
      userId: session?.user.id!,
    });
  try {
    const [b] = await db
      .insert(bigBlueButtonBnRecordings)
      .values(newBigBlueButtonBnRecording)
      .returning();
    return { bigBlueButtonBnRecording: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBigBlueButtonBnRecording = async (
  id: BigBlueButtonBnRecordingId,
  bigBlueButtonBnRecording: UpdateBigBlueButtonBnRecordingParams,
) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnRecordingId } =
    bigBlueButtonBnRecordingIdSchema.parse({ id });
  const newBigBlueButtonBnRecording =
    updateBigBlueButtonBnRecordingSchema.parse({
      ...bigBlueButtonBnRecording,
      userId: session?.user.id!,
    });
  try {
    const [b] = await db
      .update(bigBlueButtonBnRecordings)
      .set({ ...newBigBlueButtonBnRecording, updatedAt: new Date() })
      .where(
        and(
          eq(bigBlueButtonBnRecordings.id, bigBlueButtonBnRecordingId!),
          eq(bigBlueButtonBnRecordings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bigBlueButtonBnRecording: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBigBlueButtonBnRecording = async (
  id: BigBlueButtonBnRecordingId,
) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnRecordingId } =
    bigBlueButtonBnRecordingIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(bigBlueButtonBnRecordings)
      .where(
        and(
          eq(bigBlueButtonBnRecordings.id, bigBlueButtonBnRecordingId!),
          eq(bigBlueButtonBnRecordings.userId, session?.user.id!),
        ),
      )
      .returning();
    return { bigBlueButtonBnRecording: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
