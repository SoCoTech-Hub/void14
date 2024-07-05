import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { PaymentId } from "../../db/schema/payments";
import { db } from "../../db/index";
import { paymentAccounts } from "../../db/schema/paymentAccounts";
import { paymentIdSchema, payments } from "../../db/schema/payments";

export const getPayments = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ payment: payments, paymentAccount: paymentAccounts })
    .from(payments)
    .leftJoin(
      paymentAccounts,
      eq(payments.paymentAccountId, paymentAccounts.id),
    )
    .where(eq(payments.userId, session?.user.id!));
  const p = rows.map((r) => ({
    ...r.payment,
    paymentAccount: r.paymentAccount,
  }));
  return { payments: p };
};

export const getPaymentById = async (id: PaymentId) => {
  const { session } = await getUserAuth();
  const { id: paymentId } = paymentIdSchema.parse({ id });
  const [row] = await db
    .select({ payment: payments, paymentAccount: paymentAccounts })
    .from(payments)
    .where(
      and(eq(payments.id, paymentId), eq(payments.userId, session?.user.id!)),
    )
    .leftJoin(
      paymentAccounts,
      eq(payments.paymentAccountId, paymentAccounts.id),
    );
  if (row === undefined) return {};
  const p = { ...row.payment, paymentAccount: row.paymentAccount };
  return { payment: p };
};
