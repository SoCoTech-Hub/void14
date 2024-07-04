import {
  createMessageinboundHandler,
  deleteMessageinboundHandler,
  updateMessageinboundHandler,
} from "../api/messageinboundHandlers/mutations";
import {
  getMessageinboundHandlerById,
  getMessageinboundHandlers,
} from "../api/messageinboundHandlers/queries";
import {
  insertMessageinboundHandlerParams,
  messageinboundHandlerIdSchema,
  updateMessageinboundHandlerParams,
} from "../db/schema/messageinboundHandlers";
import { publicProcedure, router } from "../server/trpc";

export const messageinboundHandlersRouter = router({
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
