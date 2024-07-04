import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { BlockRssClientId } from "../db/schema/blockRssClients";
import { db } from "../db/index";
import {
  blockRssClientIdSchema,
  blockRssClients,
} from "../db/schema/blockRssClients";

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
