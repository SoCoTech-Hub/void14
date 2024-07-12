import {
  insertMessageinboundHandlerParams,
  messageinboundHandlerIdSchema,
  updateMessageinboundHandlerParams,
} from "@soco/message-db/schema/messageinboundHandlers";

import {
  createMessageinboundHandler,
  deleteMessageinboundHandler,
  updateMessageinboundHandler,
} from "../api/messageinboundHandlers/mutations";
import {
  getMessageinboundHandlerById,
  getMessageinboundHandlers,
} from "../api/messageinboundHandlers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageinboundHandlersRouter = createTRPCRouter({
  getMessageinboundHandlers: publicProcedure.query(async () => {
    return getMessageinboundHandlers();
  }),
  getMessageinboundHandlerById: publicProcedure
    .input(messageinboundHandlerIdSchema)
    .query(async ({ input }) => {
      return getMessageinboundHandlerById(input.id);
    }),
  createMessageinboundHandler: publicProcedure
    .input(insertMessageinboundHandlerParams)
    .mutation(async ({ input }) => {
      return createMessageinboundHandler(input);
    }),
  updateMessageinboundHandler: publicProcedure
    .input(updateMessageinboundHandlerParams)
    .mutation(async ({ input }) => {
      return updateMessageinboundHandler(input.id, input);
    }),
  deleteMessageinboundHandler: publicProcedure
    .input(messageinboundHandlerIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageinboundHandler(input.id);
    }),
});
