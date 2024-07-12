import type {
  NewPaygwPaypalParams,
  PaygwPaypalId,
  UpdatePaygwPaypalParams,
} from "@soco/payment-db/schema/paygwPaypals";
import { eq } from "@soco/payment-db";
import { db } from "@soco/payment-db/client";
import {
  insertPaygwPaypalSchema,
  paygwPaypalIdSchema,
  paygwPaypals,
  updatePaygwPaypalSchema,
} from "@soco/payment-db/schema/paygwPaypals";

export const createPaygwPaypal = async (paygwPaypal: NewPaygwPaypalParams) => {
  const newPaygwPaypal = insertPaygwPaypalSchema.parse(paygwPaypal);
  try {
    const [p] = await db
      .insert(paygwPaypals)
      .values(newPaygwPaypal)
      .returning();
    return { paygwPaypal: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePaygwPaypal = async (
  id: PaygwPaypalId,
  paygwPaypal: UpdatePaygwPaypalParams,
) => {
  const { id: paygwPaypalId } = paygwPaypalIdSchema.parse({ id });
  const newPaygwPaypal = updatePaygwPaypalSchema.parse(paygwPaypal);
  try {
    const [p] = await db
      .update(paygwPaypals)
      .set(newPaygwPaypal)
      .where(eq(paygwPaypals.id, paygwPaypalId!))
      .returning();
    return { paygwPaypal: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePaygwPaypal = async (id: PaygwPaypalId) => {
  const { id: paygwPaypalId } = paygwPaypalIdSchema.parse({ id });
  try {
    const [p] = await db
      .delete(paygwPaypals)
      .where(eq(paygwPaypals.id, paygwPaypalId!))
      .returning();
    return { paygwPaypal: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
