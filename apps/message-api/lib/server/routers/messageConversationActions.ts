import { getMessageConversationActionById, getMessageConversationActions } from "@/lib/api/messageConversationActions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageConversationActionIdSchema,
  insertMessageConversationActionParams,
  updateMessageConversationActionParams,
} from "@/lib/db/schema/messageConversationActions";
import { createMessageConversationAction, deleteMessageConversationAction, updateMessageConversationAction } from "@/lib/api/messageConversationActions/mutations";

export const messageConversationActionsRouter = router({
  getMessageConversationActions: publicProcedure.query(async () => {
    return getMessageConversationActions();
  }),
  getMessageConversationActionById: publicProcedure.input(messageConversationActionIdSchema).query(async ({ input }) => {
    return getMessageConversationActionById(input.id);
  }),
  createMessageConversationAction: publicProcedure
    .input(insertMessageConversationActionParams)
    .mutation(async ({ input }) => {
      return createMessageConversationAction(input);
    }),
  updateMessageConversationAction: publicProcedure
    .input(updateMessageConversationActionParams)
    .mutation(async ({ input }) => {
      return updateMessageConversationAction(input.id, input);
    }),
  deleteMessageConversationAction: publicProcedure
    .input(messageConversationActionIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageConversationAction(input.id);
    }),
});
