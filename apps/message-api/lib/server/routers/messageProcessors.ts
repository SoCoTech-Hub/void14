import { getMessageProcessorById, getMessageProcessors } from "@/lib/api/messageProcessors/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageProcessorIdSchema,
  insertMessageProcessorParams,
  updateMessageProcessorParams,
} from "@/lib/db/schema/messageProcessors";
import { createMessageProcessor, deleteMessageProcessor, updateMessageProcessor } from "@/lib/api/messageProcessors/mutations";

export const messageProcessorsRouter = router({
  getMessageProcessors: publicProcedure.query(async () => {
    return getMessageProcessors();
  }),
  getMessageProcessorById: publicProcedure.input(messageProcessorIdSchema).query(async ({ input }) => {
    return getMessageProcessorById(input.id);
  }),
  createMessageProcessor: publicProcedure
    .input(insertMessageProcessorParams)
    .mutation(async ({ input }) => {
      return createMessageProcessor(input);
    }),
  updateMessageProcessor: publicProcedure
    .input(updateMessageProcessorParams)
    .mutation(async ({ input }) => {
      return updateMessageProcessor(input.id, input);
    }),
  deleteMessageProcessor: publicProcedure
    .input(messageProcessorIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageProcessor(input.id);
    }),
});
