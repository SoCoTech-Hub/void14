import type {
  MnetService2rpcId,
  NewMnetService2rpcParams,
  UpdateMnetService2rpcParams,
} from "@soco/mnet-db/schema/mnetService2rpcs";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import {
  insertMnetService2rpcSchema,
  mnetService2rpcIdSchema,
  mnetService2rpcs,
  updateMnetService2rpcSchema,
} from "@soco/mnet-db/schema/mnetService2rpcs";

export const createMnetService2rpc = async (
  mnetService2rpc: NewMnetService2rpcParams,
) => {
  const newMnetService2rpc = insertMnetService2rpcSchema.parse(mnetService2rpc);
  try {
    const [m] = await db
      .insert(mnetService2rpcs)
      .values(newMnetService2rpc)
      .returning();
    return { mnetService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetService2rpc = async (
  id: MnetService2rpcId,
  mnetService2rpc: UpdateMnetService2rpcParams,
) => {
  const { id: mnetService2rpcId } = mnetService2rpcIdSchema.parse({ id });
  const newMnetService2rpc = updateMnetService2rpcSchema.parse(mnetService2rpc);
  try {
    const [m] = await db
      .update(mnetService2rpcs)
      .set(newMnetService2rpc)
      .where(eq(mnetService2rpcs.id, mnetService2rpcId!))
      .returning();
    return { mnetService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetService2rpc = async (id: MnetService2rpcId) => {
  const { id: mnetService2rpcId } = mnetService2rpcIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(mnetService2rpcs)
      .where(eq(mnetService2rpcs.id, mnetService2rpcId!))
      .returning();
    return { mnetService2rpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
