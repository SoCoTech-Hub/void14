import { getMessageUserActionById, getMessageUserActions } from "@/lib/api/messageUserActions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messageUserActionIdSchema,
  insertMessageUserActionParams,
  updateMessageUserActionParams,
} from "@/lib/db/schema/messageUserActions";
import { createMessageUserAction, deleteMessageUserAction, updateMessageUserAction } from "@/lib/api/messageUserActions/mutations";

export const messageUserActionsRouter = router({
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
