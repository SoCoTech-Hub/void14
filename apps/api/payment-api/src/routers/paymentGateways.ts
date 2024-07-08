import { getPaymentGatewayById, getPaymentGateways } from "../api/paymentGateways/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  paymentGatewayIdSchema,
  insertPaymentGatewayParams,
  updatePaymentGatewayParams,
} from "@soco/payment-db/schema/paymentGateways";
import { createPaymentGateway, deletePaymentGateway, updatePaymentGateway } from "../api/paymentGateways/mutations";

export const paymentGatewaysRouter =createTRPCRouter({
  getPaymentGateways: publicProcedure.query(async () => {
    return getPaymentGateways();
  }),
  getPaymentGatewayById: publicProcedure.input(paymentGatewayIdSchema).query(async ({ input }) => {
    return getPaymentGatewayById(input.id);
  }),
  createPaymentGateway: publicProcedure
    .input(insertPaymentGatewayParams)
    .mutation(async ({ input }) => {
      return createPaymentGateway(input);
    }),
  updatePaymentGateway: publicProcedure
    .input(updatePaymentGatewayParams)
    .mutation(async ({ input }) => {
      return updatePaymentGateway(input.id, input);
    }),
  deletePaymentGateway: publicProcedure
    .input(paymentGatewayIdSchema)
    .mutation(async ({ input }) => {
      return deletePaymentGateway(input.id);
    }),
});
