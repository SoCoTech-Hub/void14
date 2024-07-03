import { getMessagePopupById, getMessagePopups } from "@/lib/api/messagePopups/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messagePopupIdSchema,
  insertMessagePopupParams,
  updateMessagePopupParams,
} from "@/lib/db/schema/messagePopups";
import { createMessagePopup, deleteMessagePopup, updateMessagePopup } from "@/lib/api/messagePopups/mutations";

export const messagePopupsRouter = router({
  getMessagePopups: publicProcedure.query(async () => {
    return getMessagePopups();
  }),
  getMessagePopupById: publicProcedure.input(messagePopupIdSchema).query(async ({ input }) => {
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
