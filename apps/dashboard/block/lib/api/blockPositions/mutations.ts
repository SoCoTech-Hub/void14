import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BlockPositionId, 
  type NewBlockPositionParams,
  type UpdateBlockPositionParams, 
  updateBlockPositionSchema,
  insertBlockPositionSchema, 
  blockPositions,
  blockPositionIdSchema 
} from "@/lib/db/schema/blockPositions";

export const createBlockPosition = async (blockPosition: NewBlockPositionParams) => {
  const newBlockPosition = insertBlockPositionSchema.parse(blockPosition);
  try {
    const [b] =  await db.insert(blockPositions).values(newBlockPosition).returning();
    return { blockPosition: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockPosition = async (id: BlockPositionId, blockPosition: UpdateBlockPositionParams) => {
  const { id: blockPositionId } = blockPositionIdSchema.parse({ id });
  const newBlockPosition = updateBlockPositionSchema.parse(blockPosition);
  try {
    const [b] =  await db
     .update(blockPositions)
     .set(newBlockPosition)
     .where(eq(blockPositions.id, blockPositionId!))
     .returning();
    return { blockPosition: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockPosition = async (id: BlockPositionId) => {
  const { id: blockPositionId } = blockPositionIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blockPositions).where(eq(blockPositions.id, blockPositionId!))
    .returning();
    return { blockPosition: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

