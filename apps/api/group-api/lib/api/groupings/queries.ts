import { eq } from "drizzle-orm";

import type { GroupingId } from "../db/schema/groupings";
import { db } from "../db/index";
import { groupingIdSchema, groupings } from "../db/schema/groupings";

export const getGroupings = async () => {
  const rows = await db.select().from(groupings);
  const g = rows;
  return { groupings: g };
};

export const getGroupingById = async (id: GroupingId) => {
  const { id: groupingId } = groupingIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(groupings)
    .where(eq(groupings.id, groupingId));
  if (row === undefined) return {};
  const g = row;
  return { grouping: g };
};
