import {
  createMessageUserAction,
  deleteMessageUserAction,
  updateMessageUserAction,
} from "../api/messageUserActions/mutations";
import {
  getMessageUserActionById,
  getMessageUserActions,
} from "../api/messageUserActions/queries";
import {
  insertMessageUserActionParams,
  messageUserActionIdSchema,
  updateMessageUserActionParams,
} from "../db/schema/messageUserActions";
import { publicProcedure, router } from "../server/trpc";

export const messageUserActionsRouter = router({
  getMessageUserActions: publicProcedure.query(async () => {
    return getMessageUserActions();
  }),
  getMessageUserActionById: publicProcedure
    .input(messageUserActionIdSchema)
    .query(async ({ input }) => {
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
