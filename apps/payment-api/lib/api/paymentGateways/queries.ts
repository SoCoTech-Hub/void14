import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PaymentGatewayId, paymentGatewayIdSchema, paymentGateways } from "@/lib/db/schema/paymentGateways";
import { paymentAccounts } from "@/lib/db/schema/paymentAccounts";

export const getPaymentGateways = async () => {
  const rows = await db.select({ paymentGateway: paymentGateways, paymentAccount: paymentAccounts }).from(paymentGateways).leftJoin(paymentAccounts, eq(paymentGateways.paymentAccountId, paymentAccounts.id));
  const p = rows .map((r) => ({ ...r.paymentGateway, paymentAccount: r.paymentAccount})); 
  return { paymentGateways: p };
};

export const getPaymentGatewayById = async (id: PaymentGatewayId) => {
  const { id: paymentGatewayId } = paymentGatewayIdSchema.parse({ id });
  const [row] = await db.select({ paymentGateway: paymentGateways, paymentAccount: paymentAccounts }).from(paymentGateways).where(eq(paymentGateways.id, paymentGatewayId)).leftJoin(paymentAccounts, eq(paymentGateways.paymentAccountId, paymentAccounts.id));
  if (row === undefined) return {};
  const p =  { ...row.paymentGateway, paymentAccount: row.paymentAccount } ;
  return { paymentGateway: p };
};


