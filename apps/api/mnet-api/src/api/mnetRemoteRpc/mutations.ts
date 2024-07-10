import { db } from "@soco/mnet-db/client";
import { eq } from "@soco/mnet-db";
import { 
  MnetRemoteRpcId, 
  NewMnetRemoteRpcParams,
  UpdateMnetRemoteRpcParams, 
  updateMnetRemoteRpcSchema,
  insertMnetRemoteRpcSchema, 
  mnetRemoteRpc,
  mnetRemoteRpcIdSchema 
} from "@soco/mnet-db/schema/mnetRemoteRpc";

export const createMnetRemoteRpc = async (mnetRemoteRpc: NewMnetRemoteRpcParams) => {
  const newMnetRemoteRpc = insertMnetRemoteRpcSchema.parse(mnetRemoteRpc);
  try {
    const [m] =  await db.insert(mnetRemoteRpc).values(newMnetRemoteRpc).returning();
    return { mnetRemoteRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetRemoteRpc = async (id: MnetRemoteRpcId, mnetRemoteRpc: UpdateMnetRemoteRpcParams) => {
  const { id: mnetRemoteRpcId } = mnetRemoteRpcIdSchema.parse({ id });
  const newMnetRemoteRpc = updateMnetRemoteRpcSchema.parse(mnetRemoteRpc);
  try {
    const [m] =  await db
     .update(mnetRemoteRpc)
     .set(newMnetRemoteRpc)
     .where(eq(mnetRemoteRpc.id, mnetRemoteRpcId!))
     .returning();
    return { mnetRemoteRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetRemoteRpc = async (id: MnetRemoteRpcId) => {
  const { id: mnetRemoteRpcId } = mnetRemoteRpcIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetRemoteRpc).where(eq(mnetRemoteRpc.id, mnetRemoteRpcId!))
    .returning();
    return { mnetRemoteRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

