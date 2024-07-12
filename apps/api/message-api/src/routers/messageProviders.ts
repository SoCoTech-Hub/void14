import {
  insertMessageProviderParams,
  messageProviderIdSchema,
  updateMessageProviderParams,
} from "@soco/message-db/schema/messageProviders";

import {
  createMessageProvider,
  deleteMessageProvider,
  updateMessageProvider,
} from "../api/messageProviders/mutations";
import {
  getMessageProviderById,
  getMessageProviders,
} from "../api/messageProviders/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageProvidersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMessageProviders: publicProcedure.query(async () => {
      return getMessageProviders();
    }),
    getMessageProviderById: publicProcedure
      .input(messageProviderIdSchema)
      .query(async ({ input }) => {
        return getMessageProviderById(input.id);
      }),
    createMessageProvider: publicProcedure
      .input(insertMessageProviderParams)
      .mutation(async ({ input }) => {
        return createMessageProvider(input);
      }),
    updateMessageProvider: publicProcedure
      .input(updateMessageProviderParams)
      .mutation(async ({ input }) => {
        return updateMessageProvider(input.id, input);
      }),
    deleteMessageProvider: publicProcedure
      .input(messageProviderIdSchema)
      .mutation(async ({ input }) => {
        return deleteMessageProvider(input.id);
      }),
  });
