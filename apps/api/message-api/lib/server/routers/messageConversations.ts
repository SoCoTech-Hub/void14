import {
  createMessageConversation,
  deleteMessageConversation,
  updateMessageConversation,
} from "../api/messageConversations/mutations";
import {
  getMessageConversationById,
  getMessageConversations,
} from "../api/messageConversations/queries";
import {
  insertMessageConversationParams,
  messageConversationIdSchema,
  updateMessageConversationParams,
} from "../db/schema/messageConversations";
import { publicProcedure, router } from "../server/trpc";

export const messageConversationsRouter = router({
  getMessageConversations: publicProcedure.query(async () => {
    return getMessageConversations();
  }),
  getMessageConversationById: publicProcedure
    .input(messageConversationIdSchema)
    .query(async ({ input }) => {
      return getMessageConversationById(input.id);
    }),
  createMessageConversation: publicProcedure
    .input(insertMessageConversationParams)
    .mutation(async ({ input }) => {
      return createMessageConversation(input);
    }),
  updateMessageConversation: publicProcedure
    .input(updateMessageConversationParams)
    .mutation(async ({ input }) => {
      return updateMessageConversation(input.id, input);
    }),
  deleteMessageConversation: publicProcedure
    .input(messageConversationIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageConversation(input.id);
    }),
});
