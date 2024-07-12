import type {
  NewShowParams,
  ShowId,
  UpdateShowParams,
} from "@soco/show-db/schema/shows";
import { eq } from "@soco/show-db";
import { db } from "@soco/show-db/client";
import {
  insertShowSchema,
  showIdSchema,
  shows,
  updateShowSchema,
} from "@soco/show-db/schema/shows";

export const createShow = async (show: NewShowParams) => {
  const newShow = insertShowSchema.parse(show);
  try {
    const [s] = await db.insert(shows).values(newShow).returning();
    return { show: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateShow = async (id: ShowId, show: UpdateShowParams) => {
  const { id: showId } = showIdSchema.parse({ id });
  const newShow = updateShowSchema.parse(show);
  try {
    const [s] = await db
      .update(shows)
      .set({ ...newShow, updatedAt: new Date() })
      .where(eq(shows.id, showId!))
      .returning();
    return { show: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteShow = async (id: ShowId) => {
  const { id: showId } = showIdSchema.parse({ id });
  try {
    const [s] = await db.delete(shows).where(eq(shows.id, showId!)).returning();
    return { show: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
