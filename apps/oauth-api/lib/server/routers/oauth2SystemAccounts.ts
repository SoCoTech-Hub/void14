import { getOauth2SystemAccountById, getOauth2SystemAccounts } from "@/lib/api/oauth2SystemAccounts/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  oauth2SystemAccountIdSchema,
  insertOauth2SystemAccountParams,
  updateOauth2SystemAccountParams,
} from "@/lib/db/schema/oauth2SystemAccounts";
import { createOauth2SystemAccount, deleteOauth2SystemAccount, updateOauth2SystemAccount } from "@/lib/api/oauth2SystemAccounts/mutations";

export const oauth2SystemAccountsRouter = router({
  getOauth2SystemAccounts: publicProcedure.query(async () => {
    return getOauth2SystemAccounts();
  }),
  getOauth2SystemAccountById: publicProcedure.input(oauth2SystemAccountIdSchema).query(async ({ input }) => {
    return getOauth2SystemAccountById(input.id);
  }),
  createOauth2SystemAccount: publicProcedure
    .input(insertOauth2SystemAccountParams)
    .mutation(async ({ input }) => {
      return createOauth2SystemAccount(input);
    }),
  updateOauth2SystemAccount: publicProcedure
    .input(updateOauth2SystemAccountParams)
    .mutation(async ({ input }) => {
      return updateOauth2SystemAccount(input.id, input);
    }),
  deleteOauth2SystemAccount: publicProcedure
    .input(oauth2SystemAccountIdSchema)
    .mutation(async ({ input }) => {
      return deleteOauth2SystemAccount(input.id);
    }),
});
