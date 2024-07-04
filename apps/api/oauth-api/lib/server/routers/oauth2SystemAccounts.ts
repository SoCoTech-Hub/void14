import {
  createOauth2SystemAccount,
  deleteOauth2SystemAccount,
  updateOauth2SystemAccount,
} from "../api/oauth2SystemAccounts/mutations";
import {
  getOauth2SystemAccountById,
  getOauth2SystemAccounts,
} from "../api/oauth2SystemAccounts/queries";
import {
  insertOauth2SystemAccountParams,
  oauth2SystemAccountIdSchema,
  updateOauth2SystemAccountParams,
} from "../db/schema/oauth2SystemAccounts";
import { publicProcedure, router } from "../server/trpc";

export const oauth2SystemAccountsRouter = router({
  getOauth2SystemAccounts: publicProcedure.query(async () => {
    return getOauth2SystemAccounts();
  }),
  getOauth2SystemAccountById: publicProcedure
    .input(oauth2SystemAccountIdSchema)
    .query(async ({ input }) => {
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
