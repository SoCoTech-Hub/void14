import { db } from "@soco/block-db/index";
import { and, eq } from "drizzle-orm";
import { 
  BlockRssClientId, 
  NewBlockRssClientParams,
  UpdateBlockRssClientParams, 
  updateBlockRssClientSchema,
  insertBlockRssClientSchema, 
  blockRssClients,
  blockRssClientIdSchema 
} from "@soco/block-db/schema/blockRssClients";
import { getUserAuth } from "@/lib/auth/utils";

export const createBlockRssClient = async (blockRssClient: NewBlockRssClientParams) => {
  const { session } = await getUserAuth();
  const newBlockRssClient = insertBlockRssClientSchema.parse({ ...blockRssClient, userId: session?.user.id! });
  try {
    const [b] =  await db.insert(blockRssClients).values(newBlockRssClient).returning();
    return { blockRssClient: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBlockRssClient = async (id: BlockRssClientId, blockRssClient: UpdateBlockRssClientParams) => {
  const { session } = await getUserAuth();
  const { id: blockRssClientId } = blockRssClientIdSchema.parse({ id });
  const newBlockRssClient = updateBlockRssClientSchema.parse({ ...blockRssClient, userId: session?.user.id! });
  try {
    const [b] =  await db
     .update(blockRssClients)
     .set(newBlockRssClient)
     .where(and(eq(blockRssClients.id, blockRssClientId!), eq(blockRssClients.userId, session?.user.id!)))
     .returning();
    return { blockRssClient: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBlockRssClient = async (id: BlockRssClientId) => {
  const { session } = await getUserAuth();
  const { id: blockRssClientId } = blockRssClientIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(blockRssClients).where(and(eq(blockRssClients.id, blockRssClientId!), eq(blockRssClients.userId, session?.user.id!)))
    .returning();
    return { blockRssClient: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

