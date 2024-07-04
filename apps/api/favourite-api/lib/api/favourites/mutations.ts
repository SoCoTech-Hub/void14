import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  FavouriteId,
  favouriteIdSchema,
  favourites,
  insertFavouriteSchema,
  NewFavouriteParams,
  UpdateFavouriteParams,
  updateFavouriteSchema,
} from "../db/schema/favourites";

export const createFavourite = async (favourite: NewFavouriteParams) => {
  const { session } = await getUserAuth();
  const newFavourite = insertFavouriteSchema.parse({
    ...favourite,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db.insert(favourites).values(newFavourite).returning();
    return { favourite: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFavourite = async (
  id: FavouriteId,
  favourite: UpdateFavouriteParams,
) => {
  const { session } = await getUserAuth();
  const { id: favouriteId } = favouriteIdSchema.parse({ id });
  const newFavourite = updateFavouriteSchema.parse({
    ...favourite,
    userId: session?.user.id!,
  });
  try {
    const [f] = await db
      .update(favourites)
      .set({ ...newFavourite, updatedAt: new Date() })
      .where(
        and(
          eq(favourites.id, favouriteId!),
          eq(favourites.userId, session?.user.id!),
        ),
      )
      .returning();
    return { favourite: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFavourite = async (id: FavouriteId) => {
  const { session } = await getUserAuth();
  const { id: favouriteId } = favouriteIdSchema.parse({ id });
  try {
    const [f] = await db
      .delete(favourites)
      .where(
        and(
          eq(favourites.id, favouriteId!),
          eq(favourites.userId, session?.user.id!),
        ),
      )
      .returning();
    return { favourite: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};