import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BlockId, 
  type NewBlockParams,
  type UpdateBlockParams, 
  updateBlockSchema,
  insertBlockSchema, 
  blocks,
  blockIdSchema 
} from "@/lib/db/schema/blocks";

export const createBlock = async (block: NewBlockParams) => {
  const newBlock = insertBlockSchema.parse(block);
  try {
    const [b] =  await db.insert(blocks).values(newBlock).returning();
    return { block: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlock = async (id: BlockId, block: UpdateBlockParams) => {
  const { id: blockId } = blockIdSchema.parse({ id });
  const newBlock = updateBlockSchema.parse(block);
  try {
    const [b] =  await db
     .update(blocks)
     .set(newBlock)
     .where(eq(blocks.id, blockId!))
     .returning();
    return { block: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlock = async (id: BlockId) => {
  const { id: blockId } = blockIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blocks).where(eq(blocks.id, blockId!))
    .returning();
    return { block: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

