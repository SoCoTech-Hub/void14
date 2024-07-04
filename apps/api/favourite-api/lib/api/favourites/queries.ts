import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { FavouriteId } from "../db/schema/favourites";
import { db } from "../db/index";
import { favouriteIdSchema, favourites } from "../db/schema/favourites";

export const getFavourites = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(favourites)
    .where(eq(favourites.userId, session?.user.id!));
  const f = rows;
  return { favourites: f };
};

export const getFavouriteById = async (id: FavouriteId) => {
  const { session } = await getUserAuth();
  const { id: favouriteId } = favouriteIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(favourites)
    .where(
      and(
        eq(favourites.id, favouriteId),
        eq(favourites.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const f = row;
  return { favourite: f };
};
