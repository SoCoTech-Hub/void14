import type {
  MnetRpcId,
  NewMnetRpcParams,
  UpdateMnetRpcParams,
} from "@soco/mnet-db/schema/mnetRpcs";
import { eq } from "@soco/mnet-db";
import { db } from "@soco/mnet-db/client";
import {
  insertMnetRpcSchema,
  mnetRpcIdSchema,
  mnetRpcs,
  updateMnetRpcSchema,
} from "@soco/mnet-db/schema/mnetRpcs";

export const createMnetRpc = async (mnetRpc: NewMnetRpcParams) => {
  const newMnetRpc = insertMnetRpcSchema.parse(mnetRpc);
  try {
    const [m] = await db.insert(mnetRpcs).values(newMnetRpc).returning();
    return { mnetRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetRpc = async (
  id: MnetRpcId,
  mnetRpc: UpdateMnetRpcParams,
) => {
  const { id: mnetRpcId } = mnetRpcIdSchema.parse({ id });
  const newMnetRpc = updateMnetRpcSchema.parse(mnetRpc);
  try {
    const [m] = await db
      .update(mnetRpcs)
      .set(newMnetRpc)
      .where(eq(mnetRpcs.id, mnetRpcId!))
      .returning();
    return { mnetRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetRpc = async (id: MnetRpcId) => {
  const { id: mnetRpcId } = mnetRpcIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(mnetRpcs)
      .where(eq(mnetRpcs.id, mnetRpcId!))
      .returning();
    return { mnetRpc: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
