import type { BlockPositionId } from "@soco/block-db/schema/blockPositions";
import { eq } from "@soco/block-db";
import { db } from "@soco/block-db/client";
import { blockInstances } from "@soco/block-db/schema/blockInstances";
import {
  blockPositionIdSchema,
  blockPositions,
} from "@soco/block-db/schema/blockPositions";

export const getBlockPositions = async () => {
  const rows = await db
    .select({ blockPosition: blockPositions, blockInstance: blockInstances })
    .from(blockPositions)
    .leftJoin(
      blockInstances,
      eq(blockPositions.blockInstanceId, blockInstances.id),
    );
  const b = rows.map((r) => ({
    ...r.blockPosition,
    blockInstance: r.blockInstance,
  }));
  return { blockPositions: b };
};

export const getBlockPositionById = async (id: BlockPositionId) => {
  const { id: blockPositionId } = blockPositionIdSchema.parse({ id });
  const [row] = await db
    .select({ blockPosition: blockPositions, blockInstance: blockInstances })
    .from(blockPositions)
    .where(eq(blockPositions.id, blockPositionId))
    .leftJoin(
      blockInstances,
      eq(blockPositions.blockInstanceId, blockInstances.id),
    );
  if (row === undefined) return {};
  const b = { ...row.blockPosition, blockInstance: row.blockInstance };
  return { blockPosition: b };
};
