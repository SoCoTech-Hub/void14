import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/scale-db";
import { db } from "@soco/scale-db/client";
import {
  insertScaleSchema,
  NewScaleParams,
  ScaleId,
  scaleIdSchema,
  scales,
  UpdateScaleParams,
  updateScaleSchema,
} from "@soco/scale-db/schema/scales";

export const createScale = async (scale: NewScaleParams) => {
  const { session } = await getUserAuth();
  const newScale = insertScaleSchema.parse({
    ...scale,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db.insert(scales).values(newScale).returning();
    return { scale: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScale = async (id: ScaleId, scale: UpdateScaleParams) => {
  const { session } = await getUserAuth();
  const { id: scaleId } = scaleIdSchema.parse({ id });
  const newScale = updateScaleSchema.parse({
    ...scale,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(scales)
      .set({ ...newScale, updatedAt: new Date() })
      .where(and(eq(scales.id, scaleId!), eq(scales.userId, session?.user.id!)))
      .returning();
    return { scale: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScale = async (id: ScaleId) => {
  const { session } = await getUserAuth();
  const { id: scaleId } = scaleIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scales)
      .where(and(eq(scales.id, scaleId!), eq(scales.userId, session?.user.id!)))
      .returning();
    return { scale: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
