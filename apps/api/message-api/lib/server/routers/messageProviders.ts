import {
  createMessageProvider,
  deleteMessageProvider,
  updateMessageProvider,
} from "../api/messageProviders/mutations";
import {
  getMessageProviderById,
  getMessageProviders,
} from "../api/messageProviders/queries";
import {
  insertMessageProviderParams,
  messageProviderIdSchema,
  updateMessageProviderParams,
} from "../db/schema/messageProviders";
import { publicProcedure, router } from "../server/trpc";

export const messageProvidersRouter = router({
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
