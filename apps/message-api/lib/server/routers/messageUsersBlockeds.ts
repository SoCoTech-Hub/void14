import { getMessageUsersBlockedById, getMessageUsersBlockeds } from "@/lib/api/messageUsersBlockeds/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageUsersBlockedIdSchema,
  insertMessageUsersBlockedParams,
  updateMessageUsersBlockedParams,
} from "@/lib/db/schema/messageUsersBlockeds";
import { createMessageUsersBlocked, deleteMessageUsersBlocked, updateMessageUsersBlocked } from "@/lib/api/messageUsersBlockeds/mutations";

export const messageUsersBlockedsRouter = router({
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
