import { getMessageUserActionById, getMessageUserActions } from "../api/messageUserActions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  messageUserActionIdSchema,
  insertMessageUserActionParams,
  updateMessageUserActionParams,
} from "@soco/message-db/schema/messageUserActions";
import { createMessageUserAction, deleteMessageUserAction, updateMessageUserAction } from "../api/messageUserActions/mutations";

export const messageUserActionsRouter =createTRPCRouter({
  getMessageUserActions: publicProcedure.query(async () => {
    return getMessageUserActions();
  }),
  getMessageUserActionById: publicProcedure.input(messageUserActionIdSchema).query(async ({ input }) => {
    return getMessageUserActionById(input.id);
  }),
  createMessageUserAction: publicProcedure
    .input(insertMessageUserActionParams)
    .mutation(async ({ input }) => {
      return createMessageUserAction(input);
    }),
  updateMessageUserAction: publicProcedure
    .input(updateMessageUserActionParams)
    .mutation(async ({ input }) => {
      return updateMessageUserAction(input.id, input);
    }),
  deleteMessageUserAction: publicProcedure
    .input(messageUserActionIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessageUserAction(input.id);
    }),
});
