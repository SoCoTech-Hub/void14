import { db } from "@soco/scale-db/client";
import { eq, and } from "@soco/scale-db";
import { getUserAuth } from "@soco/auth-service";
import { type ScaleId, scaleIdSchema, scales } from "@soco/scale-db/schema/scales";

export const getScales = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(scales).where(eq(scales.userId, session?.user.id!));
  const s = rows
  return { scales: s };
};

export const getScaleById = async (id: ScaleId) => {
  const { session } = await getUserAuth();
  const { id: scaleId } = scaleIdSchema.parse({ id });
  const [row] = await db.select().from(scales).where(and(eq(scales.id, scaleId), eq(scales.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { scale: s };
};


