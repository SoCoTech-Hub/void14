import { db } from "@soco/payment-db/index";
import { eq } from "drizzle-orm";
import { type PaygwPaypalId, paygwPaypalIdSchema, paygwPaypals } from "@soco/payment-db/schema/paygwPaypals";
import { payments } from "@soco/payment-db/schema/payments";

export const getPaygwPaypals = async () => {
  const rows = await db.select({ paygwPaypal: paygwPaypals, payment: payments }).from(paygwPaypals).leftJoin(payments, eq(paygwPaypals.paymentId, payments.id));
  const p = rows .map((r) => ({ ...r.paygwPaypal, payment: r.payment})); 
  return { paygwPaypals: p };
};

export const getPaygwPaypalById = async (id: PaygwPaypalId) => {
  const { id: paygwPaypalId } = paygwPaypalIdSchema.parse({ id });
  const [row] = await db.select({ paygwPaypal: paygwPaypals, payment: payments }).from(paygwPaypals).where(eq(paygwPaypals.id, paygwPaypalId)).leftJoin(payments, eq(paygwPaypals.paymentId, payments.id));
  if (row === undefined) return {};
  const p =  { ...row.paygwPaypal, payment: row.payment } ;
  return { paygwPaypal: p };
};


