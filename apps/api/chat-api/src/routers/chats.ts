import {
  chatIdSchema,
  insertChatParams,
  updateChatParams,
} from "@soco/chat-db/schema/chats";

import { createChat, deleteChat, updateChat } from "../api/chats/mutations";
import { getChatById, getChats } from "../api/chats/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getChats: publicProcedure.query(async () => {
      return getChats();
    }),
    getChatById: publicProcedure
      .input(chatIdSchema)
      .query(async ({ input }) => {
        return getChatById(input.id);
      }),
    createChat: publicProcedure
      .input(insertChatParams)
      .mutation(async ({ input }) => {
        return createChat(input);
      }),
    updateChat: publicProcedure
      .input(updateChatParams)
      .mutation(async ({ input }) => {
        return updateChat(input.id, input);
      }),
    deleteChat: publicProcedure
      .input(chatIdSchema)
      .mutation(async ({ input }) => {
        return deleteChat(input.id);
      }),
  });
