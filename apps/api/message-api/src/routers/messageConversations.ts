import {
  insertMessageConversationParams,
  messageConversationIdSchema,
  updateMessageConversationParams,
} from "@soco/message-db/schema/messageConversations";

import {
  createMessageConversation,
  deleteMessageConversation,
  updateMessageConversation,
} from "../api/messageConversations/mutations";
import {
  getMessageConversationById,
  getMessageConversations,
} from "../api/messageConversations/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageConversationsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
