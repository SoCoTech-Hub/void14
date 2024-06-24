import { getUserPasswordResetById, getUserPasswordResets } from "@/lib/api/userPasswordResets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userPasswordResetIdSchema,
  insertUserPasswordResetParams,
  updateUserPasswordResetParams,
} from "@/lib/db/schema/userPasswordResets";
import { createUserPasswordReset, deleteUserPasswordReset, updateUserPasswordReset } from "@/lib/api/userPasswordResets/mutations";

export const userPasswordResetsRouter = router({
  getUserPasswordResets: publicProcedure.query(async () => {
    return getUserPasswordResets();
  }),
  getUserPasswordResetById: publicProcedure.input(userPasswordResetIdSchema).query(async ({ input }) => {
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
