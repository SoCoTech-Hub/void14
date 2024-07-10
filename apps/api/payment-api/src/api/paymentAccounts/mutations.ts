import { db } from "@soco/payment-db/client";
import { eq } from "@soco/payment-db";
import { 
  PaymentAccountId, 
  NewPaymentAccountParams,
  UpdatePaymentAccountParams, 
  updatePaymentAccountSchema,
  insertPaymentAccountSchema, 
  paymentAccounts,
  paymentAccountIdSchema 
} from "@soco/payment-db/schema/paymentAccounts";

export const createPaymentAccount = async (paymentAccount: NewPaymentAccountParams) => {
  const newPaymentAccount = insertPaymentAccountSchema.parse(paymentAccount);
  try {
    const [p] =  await db.insert(paymentAccounts).values(newPaymentAccount).returning();
    return { paymentAccount: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePaymentAccount = async (id: PaymentAccountId, paymentAccount: UpdatePaymentAccountParams) => {
  const { id: paymentAccountId } = paymentAccountIdSchema.parse({ id });
  const newPaymentAccount = updatePaymentAccountSchema.parse(paymentAccount);
  try {
    const [p] =  await db
     .update(paymentAccounts)
     .set({...newPaymentAccount, updatedAt: new Date() })
     .where(eq(paymentAccounts.id, paymentAccountId!))
     .returning();
    return { paymentAccount: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePaymentAccount = async (id: PaymentAccountId) => {
  const { id: paymentAccountId } = paymentAccountIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(paymentAccounts).where(eq(paymentAccounts.id, paymentAccountId!))
    .returning();
    return { paymentAccount: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

