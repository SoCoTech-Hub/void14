import { getMessageProviderById, getMessageProviders } from "../api/messageProviders/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageProviderIdSchema,
  insertMessageProviderParams,
  updateMessageProviderParams,
} from "@soco/message-db/schema/messageProviders";
import { createMessageProvider, deleteMessageProvider, updateMessageProvider } from "../api/messageProviders/mutations";

export const messageProvidersRouter =createTRPCRouter({
  getMessageProviders: publicProcedure.query(async () => {
    return getMessageProviders();
  }),
  getMessageProviderById: publicProcedure.input(messageProviderIdSchema).query(async ({ input }) => {
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
