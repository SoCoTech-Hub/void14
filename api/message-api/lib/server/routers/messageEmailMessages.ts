import { getMessageEmailMessageById, getMessageEmailMessages } from "@/lib/api/messageEmailMessages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageEmailMessageIdSchema,
  insertMessageEmailMessageParams,
  updateMessageEmailMessageParams,
} from "@/lib/db/schema/messageEmailMessages";
import { createMessageEmailMessage, deleteMessageEmailMessage, updateMessageEmailMessage } from "@/lib/api/messageEmailMessages/mutations";

export const messageEmailMessagesRouter = router({
  getMessageEmailMessages: publicProcedure.query(async () => {
    return getMessageEmailMessages();
  }),
  getMessageEmailMessageById: publicProcedure.input(messageEmailMessageIdSchema).query(async ({ input }) => {
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
