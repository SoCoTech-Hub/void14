import { createChat, deleteChat, updateChat } from "../api/chats/mutations";
import { getChatById, getChats } from "../api/chats/queries";
import {
  chatIdSchema,
  insertChatParams,
  updateChatParams,
} from "../db/schema/chats";
import { publicProcedure, router } from "../server/trpc";

export const chatsRouter = router({
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
