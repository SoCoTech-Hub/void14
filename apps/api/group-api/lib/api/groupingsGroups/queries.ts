import { eq } from "drizzle-orm";

import type { GroupingsGroupId } from "../../db/schema/groupingsGroups";
import { db } from "../../db/index";
import { groupings } from "../../db/schema/groupings";
import {
  groupingsGroupIdSchema,
  groupingsGroups,
} from "../../db/schema/groupingsGroups";
import { groups } from "../../db/schema/groups";

export const getGroupingsGroups = async () => {
  const rows = await db
    .select({
      groupingsGroup: groupingsGroups,
      grouping: groupings,
      group: groups,
    })
    .from(groupingsGroups)
    .leftJoin(groupings, eq(groupingsGroups.groupingId, groupings.id))
    .leftJoin(groups, eq(groupingsGroups.groupId, groups.id));
  const g = rows.map((r) => ({
    ...r.groupingsGroup,
    grouping: r.grouping,
    group: r.group,
  }));
  return { groupingsGroups: g };
};

export const getGroupingsGroupById = async (id: GroupingsGroupId) => {
  const { id: groupingsGroupId } = groupingsGroupIdSchema.parse({ id });
  const [row] = await db
    .select({
      groupingsGroup: groupingsGroups,
      grouping: groupings,
      group: groups,
    })
    .from(groupingsGroups)
    .where(eq(groupingsGroups.id, groupingsGroupId))
    .leftJoin(groupings, eq(groupingsGroups.groupingId, groupings.id))
    .leftJoin(groups, eq(groupingsGroups.groupId, groups.id));
  if (row === undefined) return {};
  const g = { ...row.groupingsGroup, grouping: row.grouping, group: row.group };
  return { groupingsGroup: g };
};
