import type { ScaleId } from "@soco/scale-db/schema/scales";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/scale-db";
import { db } from "@soco/scale-db/client";
import { scaleIdSchema, scales } from "@soco/scale-db/schema/scales";

export const getScales = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(scales)
    .where(eq(scales.userId, session?.user.id!));
  const s = rows;
  return { scales: s };
};

export const getScaleById = async (id: ScaleId) => {
  const { session } = await getUserAuth();
  const { id: scaleId } = scaleIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(scales)
    .where(and(eq(scales.id, scaleId), eq(scales.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { scale: s };
};
