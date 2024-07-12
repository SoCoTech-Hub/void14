import type {
  H5pactivityId,
  NewH5pactivityParams,
  UpdateH5pactivityParams,
} from "@soco/h5p-db/schema/h5pactivities";
import { eq } from "@soco/h5p-db";
import { db } from "@soco/h5p-db/client";
import {
  h5pactivities,
  h5pactivityIdSchema,
  insertH5pactivitySchema,
  updateH5pactivitySchema,
} from "@soco/h5p-db/schema/h5pactivities";

export const createH5pactivity = async (h5pactivity: NewH5pactivityParams) => {
  const newH5pactivity = insertH5pactivitySchema.parse(h5pactivity);
  try {
    const [h] = await db
      .insert(h5pactivities)
      .values(newH5pactivity)
      .returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateH5pactivity = async (
  id: H5pactivityId,
  h5pactivity: UpdateH5pactivityParams,
) => {
  const { id: h5pactivityId } = h5pactivityIdSchema.parse({ id });
  const newH5pactivity = updateH5pactivitySchema.parse(h5pactivity);
  try {
    const [h] = await db
      .update(h5pactivities)
      .set({ ...newH5pactivity, updatedAt: new Date() })
      .where(eq(h5pactivities.id, h5pactivityId!))
      .returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteH5pactivity = async (id: H5pactivityId) => {
  const { id: h5pactivityId } = h5pactivityIdSchema.parse({ id });
  try {
    const [h] = await db
      .delete(h5pactivities)
      .where(eq(h5pactivities.id, h5pactivityId!))
      .returning();
    return { h5pactivity: h };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
