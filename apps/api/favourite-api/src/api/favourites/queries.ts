import { db } from "@soco/favourite-db/client";
import { eq, and } from "@soco/favourite-db";
import { getUserAuth } from "@soco/auth-service";
import { type FavouriteId, favouriteIdSchema, favourites } from "@soco/favourite-db/schema/favourites";

export const getFavourites = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(favourites).where(eq(favourites.userId, session?.user.id!));
  const f = rows
  return { favourites: f };
};

export const getFavouriteById = async (id: FavouriteId) => {
  const { session } = await getUserAuth();
  const { id: favouriteId } = favouriteIdSchema.parse({ id });
  const [row] = await db.select().from(favourites).where(and(eq(favourites.id, favouriteId), eq(favourites.userId, session?.user.id!)));
  if (row === undefined) return {};
  const f = row;
  return { favourite: f };
};


