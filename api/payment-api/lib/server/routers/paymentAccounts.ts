import { getPaymentAccountById, getPaymentAccounts } from "@/lib/api/paymentAccounts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  paymentAccountIdSchema,
  insertPaymentAccountParams,
  updatePaymentAccountParams,
} from "@/lib/db/schema/paymentAccounts";
import { createPaymentAccount, deletePaymentAccount, updatePaymentAccount } from "@/lib/api/paymentAccounts/mutations";

export const paymentAccountsRouter = router({
  getPaymentAccounts: publicProcedure.query(async () => {
    return getPaymentAccounts();
  }),
  getPaymentAccountById: publicProcedure.input(paymentAccountIdSchema).query(async ({ input }) => {
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
