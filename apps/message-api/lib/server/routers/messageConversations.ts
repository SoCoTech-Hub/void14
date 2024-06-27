import { getMessageConversationById, getMessageConversations } from "@/lib/api/messageConversations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageConversationIdSchema,
  insertMessageConversationParams,
  updateMessageConversationParams,
} from "@/lib/db/schema/messageConversations";
import { createMessageConversation, deleteMessageConversation, updateMessageConversation } from "@/lib/api/messageConversations/mutations";

export const messageConversationsRouter = router({
  getMessageConversations: publicProcedure.query(async () => {
    return getMessageConversations();
  }),
  getMessageConversationById: publicProcedure.input(messageConversationIdSchema).query(async ({ input }) => {
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
