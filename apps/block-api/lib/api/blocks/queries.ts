import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BlockId, blockIdSchema, blocks } from "@/lib/db/schema/blocks";

export const getBlocks = async () => {
  const rows = await db.select().from(blocks);
  const b = rows
  return { blocks: b };
};

export const getBlockById = async (id: BlockId) => {
  const { id: blockId } = blockIdSchema.parse({ id });
  const [row] = await db.select().from(blocks).where(eq(blocks.id, blockId));
  if (row === undefined) return {};
  const b = row;
  return { block: b };
};


