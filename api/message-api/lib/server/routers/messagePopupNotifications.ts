import { getMessagePopupNotificationById, getMessagePopupNotifications } from "@/lib/api/messagePopupNotifications/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  messagePopupNotificationIdSchema,
  insertMessagePopupNotificationParams,
  updateMessagePopupNotificationParams,
} from "@/lib/db/schema/messagePopupNotifications";
import { createMessagePopupNotification, deleteMessagePopupNotification, updateMessagePopupNotification } from "@/lib/api/messagePopupNotifications/mutations";

export const messagePopupNotificationsRouter = router({
  getMessagePopupNotifications: publicProcedure.query(async () => {
    return getMessagePopupNotifications();
  }),
  getMessagePopupNotificationById: publicProcedure.input(messagePopupNotificationIdSchema).query(async ({ input }) => {
    return getMessagePopupNotificationById(input.id);
  }),
  createMessagePopupNotification: publicProcedure
    .input(insertMessagePopupNotificationParams)
    .mutation(async ({ input }) => {
      return createMessagePopupNotification(input);
    }),
  updateMessagePopupNotification: publicProcedure
    .input(updateMessagePopupNotificationParams)
    .mutation(async ({ input }) => {
      return updateMessagePopupNotification(input.id, input);
    }),
  deleteMessagePopupNotification: publicProcedure
    .input(messagePopupNotificationIdSchema)
    .mutation(async ({ input }) => {
      return deleteMessagePopupNotification(input.id);
    }),
});
