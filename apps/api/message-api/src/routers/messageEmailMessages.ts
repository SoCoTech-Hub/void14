import {
  insertMessageEmailMessageParams,
  messageEmailMessageIdSchema,
  updateMessageEmailMessageParams,
} from "@soco/message-db/schema/messageEmailMessages";

import {
  createMessageEmailMessage,
  deleteMessageEmailMessage,
  updateMessageEmailMessage,
} from "../api/messageEmailMessages/mutations";
import {
  getMessageEmailMessageById,
  getMessageEmailMessages,
} from "../api/messageEmailMessages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageEmailMessagesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
