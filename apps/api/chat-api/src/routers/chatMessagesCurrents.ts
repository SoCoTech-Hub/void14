import {
  chatMessagesCurrentIdSchema,
  insertChatMessagesCurrentParams,
  updateChatMessagesCurrentParams,
} from "@soco/chat-db/schema/chatMessagesCurrents";

import {
  createChatMessagesCurrent,
  deleteChatMessagesCurrent,
  updateChatMessagesCurrent,
} from "../api/chatMessagesCurrents/mutations";
import {
  getChatMessagesCurrentById,
  getChatMessagesCurrents,
} from "../api/chatMessagesCurrents/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatMessagesCurrentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getChatMessagesCurrents: publicProcedure.query(async () => {
      return getChatMessagesCurrents();
    }),
    getChatMessagesCurrentById: publicProcedure
      .input(chatMessagesCurrentIdSchema)
      .query(async ({ input }) => {
        return getChatMessagesCurrentById(input.id);
      }),
    createChatMessagesCurrent: publicProcedure
      .input(insertChatMessagesCurrentParams)
      .mutation(async ({ input }) => {
        return createChatMessagesCurrent(input);
      }),
    updateChatMessagesCurrent: publicProcedure
      .input(updateChatMessagesCurrentParams)
      .mutation(async ({ input }) => {
        return updateChatMessagesCurrent(input.id, input);
      }),
    deleteChatMessagesCurrent: publicProcedure
      .input(chatMessagesCurrentIdSchema)
      .mutation(async ({ input }) => {
        return deleteChatMessagesCurrent(input.id);
      }),
  });
