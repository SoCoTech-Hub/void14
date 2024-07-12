import { db } from "@soco/big-blue-button-db/client";
import { eq } from "@soco/big-blue-button-db";
import { 
  type BigBlueButtonBnId, 
  type NewBigBlueButtonBnParams,
  type UpdateBigBlueButtonBnParams, 
  updateBigBlueButtonBnSchema,
  insertBigBlueButtonBnSchema, 
  bigBlueButtonBns,
  bigBlueButtonBnIdSchema 
} from "@soco/big-blue-button-db/schema/bigBlueButtonBns";

export const createBigBlueButtonBn = async (bigBlueButtonBn: NewBigBlueButtonBnParams) => {
  const newBigBlueButtonBn = insertBigBlueButtonBnSchema.parse(bigBlueButtonBn);
  try {
    const [b] =  await db.insert(bigBlueButtonBns).values(newBigBlueButtonBn).returning();
    return { bigBlueButtonBn: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBigBlueButtonBn = async (id: BigBlueButtonBnId, bigBlueButtonBn: UpdateBigBlueButtonBnParams) => {
  const { id: bigBlueButtonBnId } = bigBlueButtonBnIdSchema.parse({ id });
  const newBigBlueButtonBn = updateBigBlueButtonBnSchema.parse(bigBlueButtonBn);
  try {
    const [b] =  await db
     .update(bigBlueButtonBns)
     .set({...newBigBlueButtonBn, updatedAt: new Date() })
     .where(eq(bigBlueButtonBns.id, bigBlueButtonBnId!))
     .returning();
    return { bigBlueButtonBn: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBigBlueButtonBn = async (id: BigBlueButtonBnId) => {
  const { id: bigBlueButtonBnId } = bigBlueButtonBnIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(bigBlueButtonBns).where(eq(bigBlueButtonBns.id, bigBlueButtonBnId!))
    .returning();
    return { bigBlueButtonBn: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

