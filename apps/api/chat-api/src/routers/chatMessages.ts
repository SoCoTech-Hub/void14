import {
  chatMessageIdSchema,
  insertChatMessageParams,
  updateChatMessageParams,
} from "@soco/chat-db/schema/chatMessages";

import {
  createChatMessage,
  deleteChatMessage,
  updateChatMessage,
} from "../api/chatMessages/mutations";
import {
  getChatMessageById,
  getChatMessages,
} from "../api/chatMessages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatMessagesRouter = createTRPCRouter({
  getChatMessages: publicProcedure.query(async () => {
    return getChatMessages();
  }),
  getChatMessageById: publicProcedure
    .input(chatMessageIdSchema)
    .query(async ({ input }) => {
      return getChatMessageById(input.id);
    }),
  createChatMessage: publicProcedure
    .input(insertChatMessageParams)
    .mutation(async ({ input }) => {
      return createChatMessage(input);
    }),
  updateChatMessage: publicProcedure
    .input(updateChatMessageParams)
    .mutation(async ({ input }) => {
      return updateChatMessage(input.id, input);
    }),
  deleteChatMessage: publicProcedure
    .input(chatMessageIdSchema)
    .mutation(async ({ input }) => {
      return deleteChatMessage(input.id);
    }),
});
