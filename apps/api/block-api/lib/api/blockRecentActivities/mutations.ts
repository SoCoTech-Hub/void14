import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  BlockRecentActivityId, 
  NewBlockRecentActivityParams,
  UpdateBlockRecentActivityParams, 
  updateBlockRecentActivitySchema,
  insertBlockRecentActivitySchema, 
  blockRecentActivities,
  blockRecentActivityIdSchema 
} from "@/lib/db/schema/blockRecentActivities";
import { getUserAuth } from "@/lib/auth/utils";

export const createBlockRecentActivity = async (blockRecentActivity: NewBlockRecentActivityParams) => {
  const { session } = await getUserAuth();
  const newBlockRecentActivity = insertBlockRecentActivitySchema.parse({ ...blockRecentActivity, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(blockRecentActivities).values(newBlockRecentActivity).returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockRecentActivity = async (id: BlockRecentActivityId, blockRecentActivity: UpdateBlockRecentActivityParams) => {
  const { session } = await getUserAuth();
  const { id: blockRecentActivityId } = blockRecentActivityIdSchema.parse({ id });
  const newBlockRecentActivity = updateBlockRecentActivitySchema.parse({ ...blockRecentActivity, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(blockRecentActivities)
     .set({...newBlockRecentActivity, updatedAt: new Date() })
     .where(and(eq(blockRecentActivities.id, blockRecentActivityId!), eq(blockRecentActivities.userId, session?.user.id!)))
     .returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockRecentActivity = async (id: BlockRecentActivityId) => {
  const { session } = await getUserAuth();
  const { id: blockRecentActivityId } = blockRecentActivityIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blockRecentActivities).where(and(eq(blockRecentActivities.id, blockRecentActivityId!), eq(blockRecentActivities.userId, session?.user.id!)))
    .returning();
    return { blockRecentActivity: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

