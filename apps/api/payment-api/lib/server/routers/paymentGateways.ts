import {
  createPaymentGateway,
  deletePaymentGateway,
  updatePaymentGateway,
} from "../api/paymentGateways/mutations";
import {
  getPaymentGatewayById,
  getPaymentGateways,
} from "../api/paymentGateways/queries";
import {
  insertPaymentGatewayParams,
  paymentGatewayIdSchema,
  updatePaymentGatewayParams,
} from "../db/schema/paymentGateways";
import { publicProcedure, router } from "../server/trpc";

export const paymentGatewaysRouter = router({
  getPaymentGateways: publicProcedure.query(async () => {
    return getPaymentGateways();
  }),
  getPaymentGatewayById: publicProcedure
    .input(paymentGatewayIdSchema)
    .query(async ({ input }) => {
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
