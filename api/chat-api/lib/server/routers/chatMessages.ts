import { getChatMessageById, getChatMessages } from "@/lib/api/chatMessages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  chatMessageIdSchema,
  insertChatMessageParams,
  updateChatMessageParams,
} from "@/lib/db/schema/chatMessages";
import { createChatMessage, deleteChatMessage, updateChatMessage } from "@/lib/api/chatMessages/mutations";

export const chatMessagesRouter = router({
  getChatMessages: publicProcedure.query(async () => {
    return getChatMessages();
  }),
  getChatMessageById: publicProcedure.input(chatMessageIdSchema).query(async ({ input }) => {
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
