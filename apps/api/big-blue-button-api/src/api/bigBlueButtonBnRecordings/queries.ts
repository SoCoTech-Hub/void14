import { db } from "@soco/big-blue-button-db/client";
import { eq, and } from "@soco/big-blue-button-db";
import { getUserAuth } from "@soco/auth-service";
import { type BigBlueButtonBnRecordingId, bigBlueButtonBnRecordingIdSchema, bigBlueButtonBnRecordings } from "@soco/big-blue-button-db/schema/bigBlueButtonBnRecordings";
import { bigBlueButtonBns } from "@soco/big-blue-button-db/schema/bigBlueButtonBns";

export const getBigBlueButtonBnRecordings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ bigBlueButtonBnRecording: bigBlueButtonBnRecordings, bigBlueButtonBn: bigBlueButtonBns }).from(bigBlueButtonBnRecordings).leftJoin(bigBlueButtonBns, eq(bigBlueButtonBnRecordings.bigBlueButtonBnId, bigBlueButtonBns.id)).where(eq(bigBlueButtonBnRecordings.userId, session?.user.id!));
  const b = rows .map((r) => ({ ...r.bigBlueButtonBnRecording, bigBlueButtonBn: r.bigBlueButtonBn})); 
  return { bigBlueButtonBnRecordings: b };
};

export const getBigBlueButtonBnRecordingById = async (id: BigBlueButtonBnRecordingId) => {
  const { session } = await getUserAuth();
  const { id: bigBlueButtonBnRecordingId } = bigBlueButtonBnRecordingIdSchema.parse({ id });
  const [row] = await db.select({ bigBlueButtonBnRecording: bigBlueButtonBnRecordings, bigBlueButtonBn: bigBlueButtonBns }).from(bigBlueButtonBnRecordings).where(and(eq(bigBlueButtonBnRecordings.id, bigBlueButtonBnRecordingId), eq(bigBlueButtonBnRecordings.userId, session?.user.id!))).leftJoin(bigBlueButtonBns, eq(bigBlueButtonBnRecordings.bigBlueButtonBnId, bigBlueButtonBns.id));
  if (row === undefined) return {};
  const b =  { ...row.bigBlueButtonBnRecording, bigBlueButtonBn: row.bigBlueButtonBn } ;
  return { bigBlueButtonBnRecording: b };
};


