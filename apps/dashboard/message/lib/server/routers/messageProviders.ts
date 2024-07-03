import { getMessageProviderById, getMessageProviders } from "@/lib/api/messageProviders/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageProviderIdSchema,
  insertMessageProviderParams,
  updateMessageProviderParams,
} from "@/lib/db/schema/messageProviders";
import { createMessageProvider, deleteMessageProvider, updateMessageProvider } from "@/lib/api/messageProviders/mutations";

export const messageProvidersRouter = router({
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
