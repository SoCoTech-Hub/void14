import { getMessageById, getMessages } from "../api/messages/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageIdSchema,
  insertMessageParams,
  updateMessageParams,
} from "@soco/message-db/schema/messages";
import { createMessage, deleteMessage, updateMessage } from "../api/messages/mutations";

export const messagesRouter =createTRPCRouter({
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