import {
  insertPaymentParams,
  paymentIdSchema,
  updatePaymentParams,
} from "@soco/payment-db/schema/payments";

import {
  createPayment,
  deletePayment,
  updatePayment,
} from "../api/payments/mutations";
import { getPaymentById, getPayments } from "../api/payments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const paymentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getPayments: publicProcedure.query(async () => {
      return getPayments();
    }),
    getPaymentById: publicProcedure
      .input(paymentIdSchema)
      .query(async ({ input }) => {
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
