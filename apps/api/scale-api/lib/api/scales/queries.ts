import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ScaleId, scaleIdSchema, scales } from "@/lib/db/schema/scales";

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


