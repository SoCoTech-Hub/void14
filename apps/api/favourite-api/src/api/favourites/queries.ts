import { and, eq } from "drizzle-orm";

import type { FavouriteId } from "@soco/favourite-db/schema/favourites";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/favourite-db/index";
import {
  favouriteIdSchema,
  favourites,
} from "@soco/favourite-db/schema/favourites";

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
