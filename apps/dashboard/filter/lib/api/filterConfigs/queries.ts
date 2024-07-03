import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type FilterConfigId, filterConfigIdSchema, filterConfigs } from "@/lib/db/schema/filterConfigs";

export const getFilterConfigs = async () => {
  const rows = await db.select().from(filterConfigs);
  const f = rows
  return { filterConfigs: f };
};

export const getFilterConfigById = async (id: FilterConfigId) => {
  const { id: filterConfigId } = filterConfigIdSchema.parse({ id });
  const [row] = await db.select().from(filterConfigs).where(eq(filterConfigs.id, filterConfigId));
  if (row === undefined) return {};
  const f = row;
  return { filterConfig: f };
};


