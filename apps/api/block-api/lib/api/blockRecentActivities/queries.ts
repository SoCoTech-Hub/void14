import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { BlockRecentActivityId } from "../db/schema/blockRecentActivities";
import { db } from "../db/index";
import {
  blockRecentActivities,
  blockRecentActivityIdSchema,
} from "../db/schema/blockRecentActivities";

export const getBlockRecentActivities = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(blockRecentActivities)
    .where(eq(blockRecentActivities.userId, session?.user.id!));
  const b = rows;
  return { blockRecentActivities: b };
};

export const getBlockRecentActivityById = async (id: BlockRecentActivityId) => {
  const { session } = await getUserAuth();
  const { id: blockRecentActivityId } = blockRecentActivityIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(blockRecentActivities)
    .where(
      and(
        eq(blockRecentActivities.id, blockRecentActivityId),
        eq(blockRecentActivities.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { blockRecentActivity: b };
};
