import {
  createMessagePopupNotification,
  deleteMessagePopupNotification,
  updateMessagePopupNotification,
} from "../api/messagePopupNotifications/mutations";
import {
  getMessagePopupNotificationById,
  getMessagePopupNotifications,
} from "../api/messagePopupNotifications/queries";
import {
  insertMessagePopupNotificationParams,
  messagePopupNotificationIdSchema,
  updateMessagePopupNotificationParams,
} from "../db/schema/messagePopupNotifications";
import { publicProcedure, router } from "../server/trpc";

export const messagePopupNotificationsRouter = router({
  getMessagePopupNotifications: publicProcedure.query(async () => {
    return getMessagePopupNotifications();
  }),
  getMessagePopupNotificationById: publicProcedure
    .input(messagePopupNotificationIdSchema)
    .query(async ({ input }) => {
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
