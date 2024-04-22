import { getAuthLtiLinkedLoginById, getAuthLtiLinkedLogins } from "@/lib/api/authLtiLinkedLogins/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  authLtiLinkedLoginIdSchema,
  insertAuthLtiLinkedLoginParams,
  updateAuthLtiLinkedLoginParams,
} from "@/lib/db/schema/authLtiLinkedLogins";
import { createAuthLtiLinkedLogin, deleteAuthLtiLinkedLogin, updateAuthLtiLinkedLogin } from "@/lib/api/authLtiLinkedLogins/mutations";

export const authLtiLinkedLoginsRouter = router({
  getAuthLtiLinkedLogins: publicProcedure.query(async () => {
    return getAuthLtiLinkedLogins();
  }),
  getAuthLtiLinkedLoginById: publicProcedure.input(authLtiLinkedLoginIdSchema).query(async ({ input }) => {
    return getAuthLtiLinkedLoginById(input.id);
  }),
  createAuthLtiLinkedLogin: publicProcedure
    .input(insertAuthLtiLinkedLoginParams)
    .mutation(async ({ input }) => {
      return createAuthLtiLinkedLogin(input);
    }),
  updateAuthLtiLinkedLogin: publicProcedure
    .input(updateAuthLtiLinkedLoginParams)
    .mutation(async ({ input }) => {
      return updateAuthLtiLinkedLogin(input.id, input);
    }),
  deleteAuthLtiLinkedLogin: publicProcedure
    .input(authLtiLinkedLoginIdSchema)
    .mutation(async ({ input }) => {
      return deleteAuthLtiLinkedLogin(input.id);
    }),
});
