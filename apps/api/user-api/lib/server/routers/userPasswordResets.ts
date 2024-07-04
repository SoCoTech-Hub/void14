import {
  createUserPasswordReset,
  deleteUserPasswordReset,
  updateUserPasswordReset,
} from "../api/userPasswordResets/mutations";
import {
  getUserPasswordResetById,
  getUserPasswordResets,
} from "../api/userPasswordResets/queries";
import {
  insertUserPasswordResetParams,
  updateUserPasswordResetParams,
  userPasswordResetIdSchema,
} from "../db/schema/userPasswordResets";
import { publicProcedure, router } from "../server/trpc";

export const userPasswordResetsRouter = router({
  getUserPasswordResets: publicProcedure.query(async () => {
    return getUserPasswordResets();
  }),
  getUserPasswordResetById: publicProcedure
    .input(userPasswordResetIdSchema)
    .query(async ({ input }) => {
      return getUserPasswordResetById(input.id);
    }),
  createUserPasswordReset: publicProcedure
    .input(insertUserPasswordResetParams)
    .mutation(async ({ input }) => {
      return createUserPasswordReset(input);
    }),
  updateUserPasswordReset: publicProcedure
    .input(updateUserPasswordResetParams)
    .mutation(async ({ input }) => {
      return updateUserPasswordReset(input.id, input);
    }),
  deleteUserPasswordReset: publicProcedure
    .input(userPasswordResetIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserPasswordReset(input.id);
    }),
});
