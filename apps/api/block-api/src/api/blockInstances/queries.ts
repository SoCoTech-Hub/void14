import type { BlockInstanceId } from "@soco/block-db/schema/blockInstances";
import { db, eq } from "@soco/block-db";
import {
  blockInstanceIdSchema,
  blockInstances,
} from "@soco/block-db/schema/blockInstances";

export const getBlockInstances = async () => {
  const rows = await db.select().from(blockInstances);
  const b = rows;
  return { blockInstances: b };
};

export const getBlockInstanceById = async (id: BlockInstanceId) => {
  const { id: blockInstanceId } = blockInstanceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(blockInstances)
    .where(eq(blockInstances.id, blockInstanceId));
  if (row === undefined) return {};
  const b = row;
  return { blockInstance: b };
};
