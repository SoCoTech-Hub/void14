import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AffiliatesTransactionId, 
  type NewAffiliatesTransactionParams,
  type UpdateAffiliatesTransactionParams, 
  updateAffiliatesTransactionSchema,
  insertAffiliatesTransactionSchema, 
  affiliatesTransactions,
  affiliatesTransactionIdSchema 
} from "@/lib/db/schema/affiliatesTransactions";

export const createAffiliatesTransaction = async (affiliatesTransaction: NewAffiliatesTransactionParams) => {
  const newAffiliatesTransaction = insertAffiliatesTransactionSchema.parse(affiliatesTransaction);
  try {
    const [a] =  await db.insert(affiliatesTransactions).values(newAffiliatesTransaction).returning();
    return { affiliatesTransaction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAffiliatesTransaction = async (id: AffiliatesTransactionId, affiliatesTransaction: UpdateAffiliatesTransactionParams) => {
  const { id: affiliatesTransactionId } = affiliatesTransactionIdSchema.parse({ id });
  const newAffiliatesTransaction = updateAffiliatesTransactionSchema.parse(affiliatesTransaction);
  try {
    const [a] =  await db
     .update(affiliatesTransactions)
     .set(newAffiliatesTransaction)
     .where(eq(affiliatesTransactions.id, affiliatesTransactionId!))
     .returning();
    return { affiliatesTransaction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAffiliatesTransaction = async (id: AffiliatesTransactionId) => {
  const { id: affiliatesTransactionId } = affiliatesTransactionIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(affiliatesTransactions).where(eq(affiliatesTransactions.id, affiliatesTransactionId!))
    .returning();
    return { affiliatesTransaction: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

