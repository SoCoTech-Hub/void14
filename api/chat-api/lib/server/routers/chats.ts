import { getChatById, getChats } from "@/lib/api/chats/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  chatIdSchema,
  insertChatParams,
  updateChatParams,
} from "@/lib/db/schema/chats";
import { createChat, deleteChat, updateChat } from "@/lib/api/chats/mutations";

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
