import { getMessageProcessorById, getMessageProcessors } from "../api/messageProcessors/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageProcessorIdSchema,
  insertMessageProcessorParams,
  updateMessageProcessorParams,
} from "@soco/message-db/schema/messageProcessors";
import { createMessageProcessor, deleteMessageProcessor, updateMessageProcessor } from "../api/messageProcessors/mutations";

export const messageProcessorsRouter =createTRPCRouter({
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