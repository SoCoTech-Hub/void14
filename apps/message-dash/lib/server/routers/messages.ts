import { getMessageById, getMessages } from "@/lib/api/messages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageIdSchema,
  insertMessageParams,
  updateMessageParams,
} from "@/lib/db/schema/messages";
import { createMessage, deleteMessage, updateMessage } from "@/lib/api/messages/mutations";

export const messagesRouter = router({
  getMessages: publicProcedure.query(async () => {
    return getMessages();
  }),
  getMessageById: publicProcedure.input(messageIdSchema).query(async ({ input }) => {
    return getMessageById(input.id);
  }),
  createMessage: publicProcedure
    .input(insertMessageParams)
    .mutation(async ({ input }) => {
      return createMessage(input);
    }),
  updateMessage: publicProcedure
    .input(updateMessageParams)
    .mutation(async ({ input }) => {
      return updateMessage(input.id, input);
    }),
  deleteMessage: publicProcedure
    .input(messageIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessage(input.id);
    }),
});
