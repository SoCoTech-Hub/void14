import {
  createMessageUsersBlocked,
  deleteMessageUsersBlocked,
  updateMessageUsersBlocked,
} from "../api/messageUsersBlockeds/mutations";
import {
  getMessageUsersBlockedById,
  getMessageUsersBlockeds,
} from "../api/messageUsersBlockeds/queries";
import {
  insertMessageUsersBlockedParams,
  messageUsersBlockedIdSchema,
  updateMessageUsersBlockedParams,
} from "../db/schema/messageUsersBlockeds";
import { publicProcedure, router } from "../server/trpc";

export const messageUsersBlockedsRouter = router({
  getMessageUsersBlockeds: publicProcedure.query(async () => {
    return getMessageUsersBlockeds();
  }),
  getMessageUsersBlockedById: publicProcedure
    .input(messageUsersBlockedIdSchema)
    .query(async ({ input }) => {
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
