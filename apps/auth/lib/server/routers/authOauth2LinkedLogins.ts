import { getAuthOauth2LinkedLoginById, getAuthOauth2LinkedLogins } from "@/lib/api/authOauth2LinkedLogins/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  authOauth2LinkedLoginIdSchema,
  insertAuthOauth2LinkedLoginParams,
  updateAuthOauth2LinkedLoginParams,
} from "@/lib/db/schema/authOauth2LinkedLogins";
import { createAuthOauth2LinkedLogin, deleteAuthOauth2LinkedLogin, updateAuthOauth2LinkedLogin } from "@/lib/api/authOauth2LinkedLogins/mutations";

export const authOauth2LinkedLoginsRouter = router({
  getAuthOauth2LinkedLogins: publicProcedure.query(async () => {
    return getAuthOauth2LinkedLogins();
  }),
  getAuthOauth2LinkedLoginById: publicProcedure.input(authOauth2LinkedLoginIdSchema).query(async ({ input }) => {
    return getAuthOauth2LinkedLoginById(input.id);
  }),
  createAuthOauth2LinkedLogin: publicProcedure
    .input(insertAuthOauth2LinkedLoginParams)
    .mutation(async ({ input }) => {
      return createAuthOauth2LinkedLogin(input);
    }),
  updateAuthOauth2LinkedLogin: publicProcedure
    .input(updateAuthOauth2LinkedLoginParams)
    .mutation(async ({ input }) => {
      return updateAuthOauth2LinkedLogin(input.id, input);
    }),
  deleteAuthOauth2LinkedLogin: publicProcedure
    .input(authOauth2LinkedLoginIdSchema)
    .mutation(async ({ input }) => {
      return deleteAuthOauth2LinkedLogin(input.id);
    }),
});
