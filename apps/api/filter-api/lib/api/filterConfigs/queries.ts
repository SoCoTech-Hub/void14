import { eq } from "drizzle-orm";

import type { FilterConfigId } from "../db/schema/filterConfigs";
import { db } from "../db/index";
import {
  filterConfigIdSchema,
  filterConfigs,
} from "../db/schema/filterConfigs";

export const getFilterConfigs = async () => {
  const rows = await db.select().from(filterConfigs);
  const f = rows;
  return { filterConfigs: f };
};

export const getFilterConfigById = async (id: FilterConfigId) => {
  const { id: filterConfigId } = filterConfigIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(filterConfigs)
    .where(eq(filterConfigs.id, filterConfigId));
  if (row === undefined) return {};
  const f = row;
  return { filterConfig: f };
};
