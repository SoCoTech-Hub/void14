import { getPaymentById, getPayments } from "@/lib/api/payments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  paymentIdSchema,
  insertPaymentParams,
  updatePaymentParams,
} from "@/lib/db/schema/payments";
import { createPayment, deletePayment, updatePayment } from "@/lib/api/payments/mutations";

export const paymentsRouter = router({
  getPayments: publicProcedure.query(async () => {
    return getPayments();
  }),
  getPaymentById: publicProcedure.input(paymentIdSchema).query(async ({ input }) => {
    return getPaymentById(input.id);
  }),
  createPayment: publicProcedure
    .input(insertPaymentParams)
    .mutation(async ({ input }) => {
      return createPayment(input);
    }),
  updatePayment: publicProcedure
    .input(updatePaymentParams)
    .mutation(async ({ input }) => {
      return updatePayment(input.id, input);
    }),
  deletePayment: publicProcedure
    .input(paymentIdSchema)
    .mutation(async ({ input }) => {
      return deletePayment(input.id);
    }),
});
