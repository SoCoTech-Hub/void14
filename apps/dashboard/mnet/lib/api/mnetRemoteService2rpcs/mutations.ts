import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type MnetRemoteService2rpcId, 
  type NewMnetRemoteService2rpcParams,
  type UpdateMnetRemoteService2rpcParams, 
  updateMnetRemoteService2rpcSchema,
  insertMnetRemoteService2rpcSchema, 
  mnetRemoteService2rpcs,
  mnetRemoteService2rpcIdSchema 
} from "@/lib/db/schema/mnetRemoteService2rpcs";

export const createMnetRemoteService2rpc = async (mnetRemoteService2rpc: NewMnetRemoteService2rpcParams) => {
  const newMnetRemoteService2rpc = insertMnetRemoteService2rpcSchema.parse(mnetRemoteService2rpc);
  try {
    const [m] =  await db.insert(mnetRemoteService2rpcs).values(newMnetRemoteService2rpc).returning();
    return { mnetRemoteService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetRemoteService2rpc = async (id: MnetRemoteService2rpcId, mnetRemoteService2rpc: UpdateMnetRemoteService2rpcParams) => {
  const { id: mnetRemoteService2rpcId } = mnetRemoteService2rpcIdSchema.parse({ id });
  const newMnetRemoteService2rpc = updateMnetRemoteService2rpcSchema.parse(mnetRemoteService2rpc);
  try {
    const [m] =  await db
     .update(mnetRemoteService2rpcs)
     .set(newMnetRemoteService2rpc)
     .where(eq(mnetRemoteService2rpcs.id, mnetRemoteService2rpcId!))
     .returning();
    return { mnetRemoteService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetRemoteService2rpc = async (id: MnetRemoteService2rpcId) => {
  const { id: mnetRemoteService2rpcId } = mnetRemoteService2rpcIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetRemoteService2rpcs).where(eq(mnetRemoteService2rpcs.id, mnetRemoteService2rpcId!))
    .returning();
    return { mnetRemoteService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

