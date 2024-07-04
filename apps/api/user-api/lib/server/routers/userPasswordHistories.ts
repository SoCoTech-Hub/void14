import {
  createUserPasswordHistory,
  deleteUserPasswordHistory,
  updateUserPasswordHistory,
} from "../api/userPasswordHistories/mutations";
import {
  getUserPasswordHistories,
  getUserPasswordHistoryById,
} from "../api/userPasswordHistories/queries";
import {
  insertUserPasswordHistoryParams,
  updateUserPasswordHistoryParams,
  userPasswordHistoryIdSchema,
} from "../db/schema/userPasswordHistories";
import { publicProcedure, router } from "../server/trpc";

export const userPasswordHistoriesRouter = router({
  getUserPasswordHistories: publicProcedure.query(async () => {
    return getUserPasswordHistories();
  }),
  getUserPasswordHistoryById: publicProcedure
    .input(userPasswordHistoryIdSchema)
    .query(async ({ input }) => {
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
