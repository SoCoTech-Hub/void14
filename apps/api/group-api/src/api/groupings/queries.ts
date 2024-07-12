import type { GroupingId } from "@soco/group-db/schema/groupings";
import { eq } from "@soco/group-db";
import { db } from "@soco/group-db/client";
import { groupingIdSchema, groupings } from "@soco/group-db/schema/groupings";

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
