import { db } from "@soco/payment-db/index";
import { eq } from "drizzle-orm";
import { type PaymentAccountId, paymentAccountIdSchema, paymentAccounts } from "@soco/payment-db/schema/paymentAccounts";

export const getPaymentAccounts = async () => {
  const rows = await db.select().from(paymentAccounts);
  const p = rows
  return { paymentAccounts: p };
};

export const getPaymentAccountById = async (id: PaymentAccountId) => {
  const { id: paymentAccountId } = paymentAccountIdSchema.parse({ id });
  const [row] = await db.select().from(paymentAccounts).where(eq(paymentAccounts.id, paymentAccountId));
  if (row === undefined) return {};
  const p = row;
  return { paymentAccount: p };
};


