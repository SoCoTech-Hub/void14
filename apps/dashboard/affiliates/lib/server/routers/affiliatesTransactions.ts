import { getAffiliatesTransactionById, getAffiliatesTransactions } from "@/lib/api/affiliatesTransactions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  affiliatesTransactionIdSchema,
  insertAffiliatesTransactionParams,
  updateAffiliatesTransactionParams,
} from "@/lib/db/schema/affiliatesTransactions";
import { createAffiliatesTransaction, deleteAffiliatesTransaction, updateAffiliatesTransaction } from "@/lib/api/affiliatesTransactions/mutations";

export const affiliatesTransactionsRouter = router({
  getAffiliatesTransactions: publicProcedure.query(async () => {
    return getAffiliatesTransactions();
  }),
  getAffiliatesTransactionById: publicProcedure.input(affiliatesTransactionIdSchema).query(async ({ input }) => {
    return getAffiliatesTransactionById(input.id);
  }),
  createAffiliatesTransaction: publicProcedure
    .input(insertAffiliatesTransactionParams)
    .mutation(async ({ input }) => {
      return createAffiliatesTransaction(input);
    }),
  updateAffiliatesTransaction: publicProcedure
    .input(updateAffiliatesTransactionParams)
    .mutation(async ({ input }) => {
      return updateAffiliatesTransaction(input.id, input);
    }),
  deleteAffiliatesTransaction: publicProcedure
    .input(affiliatesTransactionIdSchema)
    .mutation(async ({ input }) => {
      return deleteAffiliatesTransaction(input.id);
    }),
});
