import { db } from "@soco/show-db/index";
import { eq } from "drizzle-orm";
import { type ShowId, showIdSchema, shows } from "@soco/show-db/schema/shows";
import { showsCategories } from "@soco/show-db/schema/showsCategories";

export const getShows = async () => {
  const rows = await db.select({ show: shows, showsCategory: showsCategories }).from(shows).leftJoin(showsCategories, eq(shows.showsCategoryId, showsCategories.id));
  const s = rows .map((r) => ({ ...r.show, showsCategory: r.showsCategory})); 
  return { shows: s };
};

export const getShowById = async (id: ShowId) => {
  const { id: showId } = showIdSchema.parse({ id });
  const [row] = await db.select({ show: shows, showsCategory: showsCategories }).from(shows).where(eq(shows.id, showId)).leftJoin(showsCategories, eq(shows.showsCategoryId, showsCategories.id));
  if (row === undefined) return {};
  const s =  { ...row.show, showsCategory: row.showsCategory } ;
  return { show: s };
};


