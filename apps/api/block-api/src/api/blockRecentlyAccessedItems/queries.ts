import { and, eq } from "drizzle-orm";

import type { BlockRecentlyAccessedItemId } from "@soco/block-db/schema/blockRecentlyAccessedItems";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/block-db/index";
import {
  blockRecentlyAccessedItemIdSchema,
  blockRecentlyAccessedItems,
} from "@soco/block-db/schema/blockRecentlyAccessedItems";

export const getBlockRecentlyAccessedItems = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(blockRecentlyAccessedItems)
    .where(eq(blockRecentlyAccessedItems.userId, session?.user.id!));
  const b = rows;
  return { blockRecentlyAccessedItems: b };
};

export const getBlockRecentlyAccessedItemById = async (
  id: BlockRecentlyAccessedItemId,
) => {
  const { session } = await getUserAuth();
  const { id: blockRecentlyAccessedItemId } =
    blockRecentlyAccessedItemIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(blockRecentlyAccessedItems)
    .where(
      and(
        eq(blockRecentlyAccessedItems.id, blockRecentlyAccessedItemId),
        eq(blockRecentlyAccessedItems.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { blockRecentlyAccessedItem: b };
};
