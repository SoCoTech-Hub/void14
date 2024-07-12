import { db } from "@soco/mnet-db/client";
import { eq } from "@soco/mnet-db";
import { 
  type MnetHostId, 
  type NewMnetHostParams,
  type UpdateMnetHostParams, 
  updateMnetHostSchema,
  insertMnetHostSchema, 
  mnetHosts,
  mnetHostIdSchema 
} from "@soco/mnet-db/schema/mnetHosts";

export const createMnetHost = async (mnetHost: NewMnetHostParams) => {
  const newMnetHost = insertMnetHostSchema.parse(mnetHost);
  try {
    const [m] =  await db.insert(mnetHosts).values(newMnetHost).returning();
    return { mnetHost: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetHost = async (id: MnetHostId, mnetHost: UpdateMnetHostParams) => {
  const { id: mnetHostId } = mnetHostIdSchema.parse({ id });
  const newMnetHost = updateMnetHostSchema.parse(mnetHost);
  try {
    const [m] =  await db
     .update(mnetHosts)
     .set(newMnetHost)
     .where(eq(mnetHosts.id, mnetHostId!))
     .returning();
    return { mnetHost: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetHost = async (id: MnetHostId) => {
  const { id: mnetHostId } = mnetHostIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(mnetHosts).where(eq(mnetHosts.id, mnetHostId!))
    .returning();
    return { mnetHost: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

