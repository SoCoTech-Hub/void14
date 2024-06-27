import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BlockPositionId, blockPositionIdSchema, blockPositions } from "@/lib/db/schema/blockPositions";
import { blockInstances } from "@/lib/db/schema/blockInstances";

export const getBlockPositions = async () => {
  const rows = await db.select({ blockPosition: blockPositions, blockInstance: blockInstances }).from(blockPositions).leftJoin(blockInstances, eq(blockPositions.blockInstanceId, blockInstances.id));
  const b = rows .map((r) => ({ ...r.blockPosition, blockInstance: r.blockInstance})); 
  return { blockPositions: b };
};

export const getBlockPositionById = async (id: BlockPositionId) => {
  const { id: blockPositionId } = blockPositionIdSchema.parse({ id });
  const [row] = await db.select({ blockPosition: blockPositions, blockInstance: blockInstances }).from(blockPositions).where(eq(blockPositions.id, blockPositionId)).leftJoin(blockInstances, eq(blockPositions.blockInstanceId, blockInstances.id));
  if (row === undefined) return {};
  const b =  { ...row.blockPosition, blockInstance: row.blockInstance } ;
  return { blockPosition: b };
};


