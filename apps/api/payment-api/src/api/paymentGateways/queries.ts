import type { PaymentGatewayId } from "@soco/payment-db/schema/paymentGateways";
import { eq } from "@soco/payment-db";
import { db } from "@soco/payment-db/client";
import { paymentAccounts } from "@soco/payment-db/schema/paymentAccounts";
import {
  paymentGatewayIdSchema,
  paymentGateways,
} from "@soco/payment-db/schema/paymentGateways";

export const getPaymentGateways = async () => {
  const rows = await db
    .select({
      paymentGateway: paymentGateways,
      paymentAccount: paymentAccounts,
    })
    .from(paymentGateways)
    .leftJoin(
      paymentAccounts,
      eq(paymentGateways.paymentAccountId, paymentAccounts.id),
    );
  const p = rows.map((r) => ({
    ...r.paymentGateway,
    paymentAccount: r.paymentAccount,
  }));
  return { paymentGateways: p };
};

export const getPaymentGatewayById = async (id: PaymentGatewayId) => {
  const { id: paymentGatewayId } = paymentGatewayIdSchema.parse({ id });
  const [row] = await db
    .select({
      paymentGateway: paymentGateways,
      paymentAccount: paymentAccounts,
    })
    .from(paymentGateways)
    .where(eq(paymentGateways.id, paymentGatewayId))
    .leftJoin(
      paymentAccounts,
      eq(paymentGateways.paymentAccountId, paymentAccounts.id),
    );
  if (row === undefined) return {};
  const p = { ...row.paymentGateway, paymentAccount: row.paymentAccount };
  return { paymentGateway: p };
};
