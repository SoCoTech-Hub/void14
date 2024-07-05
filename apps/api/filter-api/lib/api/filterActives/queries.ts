import { eq } from "drizzle-orm";

import type { FilterActiveId } from "../../db/schema/filterActives";
import { db } from "../../db/index";
import {
  filterActiveIdSchema,
  filterActives,
} from "../../db/schema/filterActives";

export const getFilterActives = async () => {
  const rows = await db.select().from(filterActives);
  const f = rows;
  return { filterActives: f };
};

export const getFilterActiveById = async (id: FilterActiveId) => {
  const { id: filterActiveId } = filterActiveIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(filterActives)
    .where(eq(filterActives.id, filterActiveId));
  if (row === undefined) return {};
  const f = row;
  return { filterActive: f };
};
