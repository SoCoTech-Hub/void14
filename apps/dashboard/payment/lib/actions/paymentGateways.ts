"use server";

import { revalidatePath } from "next/cache";
import {
  createPaymentGateway,
  deletePaymentGateway,
  updatePaymentGateway,
} from "@/lib/api/paymentGateways/mutations";
import {
  PaymentGatewayId,
  NewPaymentGatewayParams,
  UpdatePaymentGatewayParams,
  paymentGatewayIdSchema,
  insertPaymentGatewayParams,
  updatePaymentGatewayParams,
} from "@/lib/db/schema/paymentGateways";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePaymentGateways = () => revalidatePath("/payment-gateways");

export const createPaymentGatewayAction = async (input: NewPaymentGatewayParams) => {
  try {
    const payload = insertPaymentGatewayParams.parse(input);
    await createPaymentGateway(payload);
    revalidatePaymentGateways();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePaymentGatewayAction = async (input: UpdatePaymentGatewayParams) => {
  try {
    const payload = updatePaymentGatewayParams.parse(input);
    await updatePaymentGateway(payload.id, payload);
    revalidatePaymentGateways();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePaymentGatewayAction = async (input: PaymentGatewayId) => {
  try {
    const payload = paymentGatewayIdSchema.parse({ id: input });
    await deletePaymentGateway(payload.id);
    revalidatePaymentGateways();
  } catch (e) {
    return handleErrors(e);
  }
};
