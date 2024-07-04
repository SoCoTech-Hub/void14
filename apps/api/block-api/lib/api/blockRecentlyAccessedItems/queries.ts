import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type BlockRecentlyAccessedItemId, blockRecentlyAccessedItemIdSchema, blockRecentlyAccessedItems } from "@/lib/db/schema/blockRecentlyAccessedItems";

export const getBlockRecentlyAccessedItems = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(blockRecentlyAccessedItems).where(eq(blockRecentlyAccessedItems.userId, session?.user.id!));
  const b = rows
  return { blockRecentlyAccessedItems: b };
};

export const getBlockRecentlyAccessedItemById = async (id: BlockRecentlyAccessedItemId) => {
  const { session } = await getUserAuth();
  const { id: blockRecentlyAccessedItemId } = blockRecentlyAccessedItemIdSchema.parse({ id });
  const [row] = await db.select().from(blockRecentlyAccessedItems).where(and(eq(blockRecentlyAccessedItems.id, blockRecentlyAccessedItemId), eq(blockRecentlyAccessedItems.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { blockRecentlyAccessedItem: b };
};


