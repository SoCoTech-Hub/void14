import { getChatMessagesCurrentById, getChatMessagesCurrents } from "@/lib/api/chatMessagesCurrents/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  chatMessagesCurrentIdSchema,
  insertChatMessagesCurrentParams,
  updateChatMessagesCurrentParams,
} from "@/lib/db/schema/chatMessagesCurrents";
import { createChatMessagesCurrent, deleteChatMessagesCurrent, updateChatMessagesCurrent } from "@/lib/api/chatMessagesCurrents/mutations";

export const chatMessagesCurrentsRouter = router({
  getChatMessagesCurrents: publicProcedure.query(async () => {
    return getChatMessagesCurrents();
  }),
  getChatMessagesCurrentById: publicProcedure.input(chatMessagesCurrentIdSchema).query(async ({ input }) => {
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
