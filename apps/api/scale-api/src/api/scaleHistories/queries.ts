import { db } from "@soco/scale-db/client";
import { eq, and } from "@soco/scale-db";
import { getUserAuth } from "@soco/auth-service";
import { type ScaleHistoryId, scaleHistoryIdSchema, scaleHistories } from "@soco/scale-db/schema/scaleHistories";

export const getScaleHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(scaleHistories).where(eq(scaleHistories.userId, session?.user.id!));
  const s = rows
  return { scaleHistories: s };
};

export const getScaleHistoryById = async (id: ScaleHistoryId) => {
  const { session } = await getUserAuth();
  const { id: scaleHistoryId } = scaleHistoryIdSchema.parse({ id });
  const [row] = await db.select().from(scaleHistories).where(and(eq(scaleHistories.id, scaleHistoryId), eq(scaleHistories.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { scaleHistory: s };
};


