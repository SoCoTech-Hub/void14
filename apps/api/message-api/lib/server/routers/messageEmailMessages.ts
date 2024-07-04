import {
  createMessageEmailMessage,
  deleteMessageEmailMessage,
  updateMessageEmailMessage,
} from "../api/messageEmailMessages/mutations";
import {
  getMessageEmailMessageById,
  getMessageEmailMessages,
} from "../api/messageEmailMessages/queries";
import {
  insertMessageEmailMessageParams,
  messageEmailMessageIdSchema,
  updateMessageEmailMessageParams,
} from "../db/schema/messageEmailMessages";
import { publicProcedure, router } from "../server/trpc";

export const messageEmailMessagesRouter = router({
  getMessageEmailMessages: publicProcedure.query(async () => {
    return getMessageEmailMessages();
  }),
  getMessageEmailMessageById: publicProcedure
    .input(messageEmailMessageIdSchema)
    .query(async ({ input }) => {
      return getMessageEmailMessageById(input.id);
    }),
  createMessageEmailMessage: publicProcedure
    .input(insertMessageEmailMessageParams)
    .mutation(async ({ input }) => {
      return createMessageEmailMessage(input);
    }),
  updateMessageEmailMessage: publicProcedure
    .input(updateMessageEmailMessageParams)
    .mutation(async ({ input }) => {
      return updateMessageEmailMessage(input.id, input);
    }),
  deleteMessageEmailMessage: publicProcedure
    .input(messageEmailMessageIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageEmailMessage(input.id);
    }),
});
