import {
  insertPaymentAccountParams,
  paymentAccountIdSchema,
  updatePaymentAccountParams,
} from "@soco/payment-db/schema/paymentAccounts";

import {
  createPaymentAccount,
  deletePaymentAccount,
  updatePaymentAccount,
} from "../api/paymentAccounts/mutations";
import {
  getPaymentAccountById,
  getPaymentAccounts,
} from "../api/paymentAccounts/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const paymentAccountsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getPaymentAccounts: publicProcedure.query(async () => {
      return getPaymentAccounts();
    }),
    getPaymentAccountById: publicProcedure
      .input(paymentAccountIdSchema)
      .query(async ({ input }) => {
        return getPaymentAccountById(input.id);
      }),
    createPaymentAccount: publicProcedure
      .input(insertPaymentAccountParams)
      .mutation(async ({ input }) => {
        return createPaymentAccount(input);
      }),
    updatePaymentAccount: publicProcedure
      .input(updatePaymentAccountParams)
      .mutation(async ({ input }) => {
        return updatePaymentAccount(input.id, input);
      }),
    deletePaymentAccount: publicProcedure
      .input(paymentAccountIdSchema)
      .mutation(async ({ input }) => {
        return deletePaymentAccount(input.id);
      }),
  });
