import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type PaymentGatewayId, 
  type NewPaymentGatewayParams,
  type UpdatePaymentGatewayParams, 
  updatePaymentGatewaySchema,
  insertPaymentGatewaySchema, 
  paymentGateways,
  paymentGatewayIdSchema 
} from "@/lib/db/schema/paymentGateways";

export const createPaymentGateway = async (paymentGateway: NewPaymentGatewayParams) => {
  const newPaymentGateway = insertPaymentGatewaySchema.parse(paymentGateway);
  try {
    const [p] =  await db.insert(paymentGateways).values(newPaymentGateway).returning();
    return { paymentGateway: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePaymentGateway = async (id: PaymentGatewayId, paymentGateway: UpdatePaymentGatewayParams) => {
  const { id: paymentGatewayId } = paymentGatewayIdSchema.parse({ id });
  const newPaymentGateway = updatePaymentGatewaySchema.parse(paymentGateway);
  try {
    const [p] =  await db
     .update(paymentGateways)
     .set({...newPaymentGateway, updatedAt: new Date() })
     .where(eq(paymentGateways.id, paymentGatewayId!))
     .returning();
    return { paymentGateway: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePaymentGateway = async (id: PaymentGatewayId) => {
  const { id: paymentGatewayId } = paymentGatewayIdSchema.parse({ id });
  try {
    const [p] =  await db.delete(paymentGateways).where(eq(paymentGateways.id, paymentGatewayId!))
    .returning();
    return { paymentGateway: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

