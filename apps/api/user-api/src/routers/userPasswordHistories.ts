import { getUserPasswordHistoryById, getUserPasswordHistories } from "../api/userPasswordHistories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  userPasswordHistoryIdSchema,
  insertUserPasswordHistoryParams,
  updateUserPasswordHistoryParams,
} from "@soco/user-db/schema/userPasswordHistories";
import { createUserPasswordHistory, deleteUserPasswordHistory, updateUserPasswordHistory } from "../api/userPasswordHistories/mutations";

export const userPasswordHistoriesRouter =createTRPCRouter({
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
