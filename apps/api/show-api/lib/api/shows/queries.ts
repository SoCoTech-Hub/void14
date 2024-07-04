import { eq } from "drizzle-orm";

import type { ShowId } from "../db/schema/shows";
import { db } from "../db/index";
import { showIdSchema, shows } from "../db/schema/shows";
import { showsCategories } from "../db/schema/showsCategories";

export const getShows = async () => {
  const rows = await db
    .select({ show: shows, showsCategory: showsCategories })
    .from(shows)
    .leftJoin(showsCategories, eq(shows.showsCategoryId, showsCategories.id));
  const s = rows.map((r) => ({ ...r.show, showsCategory: r.showsCategory }));
  return { shows: s };
};

export const getShowById = async (id: ShowId) => {
  const { id: showId } = showIdSchema.parse({ id });
  const [row] = await db
    .select({ show: shows, showsCategory: showsCategories })
    .from(shows)
    .where(eq(shows.id, showId))
    .leftJoin(showsCategories, eq(shows.showsCategoryId, showsCategories.id));
  if (row === undefined) return {};
  const s = { ...row.show, showsCategory: row.showsCategory };
  return { show: s };
};
