import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  GroupingId, 
  NewGroupingParams,
  UpdateGroupingParams, 
  updateGroupingSchema,
  insertGroupingSchema, 
  groupings,
  groupingIdSchema 
} from "@/lib/db/schema/groupings";

export const createGrouping = async (grouping: NewGroupingParams) => {
  const newGrouping = insertGroupingSchema.parse(grouping);
  try {
    const [g] =  await db.insert(groupings).values(newGrouping).returning();
    return { grouping: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGrouping = async (id: GroupingId, grouping: UpdateGroupingParams) => {
  const { id: groupingId } = groupingIdSchema.parse({ id });
  const newGrouping = updateGroupingSchema.parse(grouping);
  try {
    const [g] =  await db
     .update(groupings)
     .set({...newGrouping, updatedAt: new Date() })
     .where(eq(groupings.id, groupingId!))
     .returning();
    return { grouping: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGrouping = async (id: GroupingId) => {
  const { id: groupingId } = groupingIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(groupings).where(eq(groupings.id, groupingId!))
    .returning();
    return { grouping: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

