import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertPaymentSchema,
  NewPaymentParams,
  PaymentId,
  paymentIdSchema,
  payments,
  UpdatePaymentParams,
  updatePaymentSchema,
} from "../../db/schema/payments";

export const createPayment = async (payment: NewPaymentParams) => {
  const { session } = await getUserAuth();
  const newPayment = insertPaymentSchema.parse({
    ...payment,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db.insert(payments).values(newPayment).returning();
    return { payment: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePayment = async (
  id: PaymentId,
  payment: UpdatePaymentParams,
) => {
  const { session } = await getUserAuth();
  const { id: paymentId } = paymentIdSchema.parse({ id });
  const newPayment = updatePaymentSchema.parse({
    ...payment,
    userId: session?.user.id!,
  });
  try {
    const [p] = await db
      .update(payments)
      .set({ ...newPayment, updatedAt: new Date() })
      .where(
        and(
          eq(payments.id, paymentId!),
          eq(payments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { payment: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePayment = async (id: PaymentId) => {
  const { session } = await getUserAuth();
  const { id: paymentId } = paymentIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(payments)
      .where(
        and(
          eq(payments.id, paymentId!),
          eq(payments.userId, session?.user.id!),
        ),
      )
      .returning();
    return { payment: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
