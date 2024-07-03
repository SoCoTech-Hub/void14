import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  BigBlueButtonBnId, 
  NewBigBlueButtonBnParams,
  UpdateBigBlueButtonBnParams, 
  updateBigBlueButtonBnSchema,
  insertBigBlueButtonBnSchema, 
  bigBlueButtonBns,
  bigBlueButtonBnIdSchema 
} from "@/lib/db/schema/bigBlueButtonBns";

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

