import { and, eq } from "drizzle-orm";

import type { BlockRssClientId } from "@soco/block-db/schema/blockRssClients";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/block-db/index";
import {
  blockRssClientIdSchema,
  blockRssClients,
} from "@soco/block-db/schema/blockRssClients";

export const getBlockRssClients = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(blockRssClients)
    .where(eq(blockRssClients.userId, session?.user.id!));
  const b = rows;
  return { blockRssClients: b };
};

export const getBlockRssClientById = async (id: BlockRssClientId) => {
  const { session } = await getUserAuth();
  const { id: blockRssClientId } = blockRssClientIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(blockRssClients)
    .where(
      and(
        eq(blockRssClients.id, blockRssClientId),
        eq(blockRssClients.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { blockRssClient: b };
};