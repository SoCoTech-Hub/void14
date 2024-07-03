import { getUserPasswordHistoryById, getUserPasswordHistories } from "@/lib/api/userPasswordHistories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userPasswordHistoryIdSchema,
  insertUserPasswordHistoryParams,
  updateUserPasswordHistoryParams,
} from "@/lib/db/schema/userPasswordHistories";
import { createUserPasswordHistory, deleteUserPasswordHistory, updateUserPasswordHistory } from "@/lib/api/userPasswordHistories/mutations";

export const userPasswordHistoriesRouter = router({
  getUserPasswordHistories: publicProcedure.query(async () => {
    return getUserPasswordHistories();
  }),
  getUserPasswordHistoryById: publicProcedure.input(userPasswordHistoryIdSchema).query(async ({ input }) => {
    return getUserPasswordHistoryById(input.id);
  }),
  createUserPasswordHistory: publicProcedure
    .input(insertUserPasswordHistoryParams)
    .mutation(async ({ input }) => {
      return createUserPasswordHistory(input);
    }),
  updateUserPasswordHistory: publicProcedure
    .input(updateUserPasswordHistoryParams)
    .mutation(async ({ input }) => {
      return updateUserPasswordHistory(input.id, input);
    }),
  deleteUserPasswordHistory: publicProcedure
    .input(userPasswordHistoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserPasswordHistory(input.id);
    }),
});
