import { getMessageUsersBlockedById, getMessageUsersBlockeds } from "../api/messageUsersBlockeds/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageUsersBlockedIdSchema,
  insertMessageUsersBlockedParams,
  updateMessageUsersBlockedParams,
} from "@soco/message-db/schema/messageUsersBlockeds";
import { createMessageUsersBlocked, deleteMessageUsersBlocked, updateMessageUsersBlocked } from "../api/messageUsersBlockeds/mutations";

export const messageUsersBlockedsRouter =createTRPCRouter({
  getMessageUsersBlockeds: publicProcedure.query(async () => {
    return getMessageUsersBlockeds();
  }),
  getMessageUsersBlockedById: publicProcedure.input(messageUsersBlockedIdSchema).query(async ({ input }) => {
    return getMessageUsersBlockedById(input.id);
  }),
  createMessageUsersBlocked: publicProcedure
    .input(insertMessageUsersBlockedParams)
    .mutation(async ({ input }) => {
      return createMessageUsersBlocked(input);
    }),
  updateMessageUsersBlocked: publicProcedure
    .input(updateMessageUsersBlockedParams)
    .mutation(async ({ input }) => {
      return updateMessageUsersBlocked(input.id, input);
    }),
  deleteMessageUsersBlocked: publicProcedure
    .input(messageUsersBlockedIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageUsersBlocked(input.id);
    }),
});
