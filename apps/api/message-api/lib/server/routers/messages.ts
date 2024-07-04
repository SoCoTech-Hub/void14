import {
  createMessage,
  deleteMessage,
  updateMessage,
} from "../api/messages/mutations";
import { getMessageById, getMessages } from "../api/messages/queries";
import {
  insertMessageParams,
  messageIdSchema,
  updateMessageParams,
} from "../db/schema/messages";
import { publicProcedure, router } from "../server/trpc";

export const messagesRouter = router({
  getMessages: publicProcedure.query(async () => {
    return getMessages();
  }),
  getMessageById: publicProcedure
    .input(messageIdSchema)
    .query(async ({ input }) => {
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
