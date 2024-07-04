import {
  createMessagePopup,
  deleteMessagePopup,
  updateMessagePopup,
} from "../api/messagePopups/mutations";
import {
  getMessagePopupById,
  getMessagePopups,
} from "../api/messagePopups/queries";
import {
  insertMessagePopupParams,
  messagePopupIdSchema,
  updateMessagePopupParams,
} from "../db/schema/messagePopups";
import { publicProcedure, router } from "../server/trpc";

export const messagePopupsRouter = router({
  getMessagePopups: publicProcedure.query(async () => {
    return getMessagePopups();
  }),
  getMessagePopupById: publicProcedure
    .input(messagePopupIdSchema)
    .query(async ({ input }) => {
      return getMessagePopupById(input.id);
    }),
  createMessagePopup: publicProcedure
    .input(insertMessagePopupParams)
    .mutation(async ({ input }) => {
      return createMessagePopup(input);
    }),
  updateMessagePopup: publicProcedure
    .input(updateMessagePopupParams)
    .mutation(async ({ input }) => {
      return updateMessagePopup(input.id, input);
    }),
  deleteMessagePopup: publicProcedure
    .input(messagePopupIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessagePopup(input.id);
    }),
});
