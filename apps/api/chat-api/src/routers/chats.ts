import { getChatById, getChats } from "../api/chats/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  chatIdSchema,
  insertChatParams,
  updateChatParams,
} from "@soco/chat-db/schema/chats";
import { createChat, deleteChat, updateChat } from "../api/chats/mutations";

export const chatsRouter =createTRPCRouter({
  getChats: publicProcedure.query(async () => {
    return getChats();
  }),
  getChatById: publicProcedure.input(chatIdSchema).query(async ({ input }) => {
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
