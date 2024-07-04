import {
  createNotification,
  deleteNotification,
  updateNotification,
} from "../api/notifications/mutations";
import {
  getNotificationById,
  getNotifications,
} from "../api/notifications/queries";
import {
  insertNotificationParams,
  notificationIdSchema,
  updateNotificationParams,
} from "../db/schema/notifications";
import { publicProcedure, router } from "../server/trpc";

export const notificationsRouter = router({
  getNotifications: publicProcedure.query(async () => {
    return getNotifications();
  }),
  getNotificationById: publicProcedure
    .input(notificationIdSchema)
    .query(async ({ input }) => {
      return getNotificationById(input.id);
    }),
  createNotification: publicProcedure
    .input(insertNotificationParams)
    .mutation(async ({ input }) => {
      return createNotification(input);
    }),
  updateNotification: publicProcedure
    .input(updateNotificationParams)
    .mutation(async ({ input }) => {
      return updateNotification(input.id, input);
    }),
  deleteNotification: publicProcedure
    .input(notificationIdSchema)
    .mutation(async ({ input }) => {
      return deleteNotification(input.id);
    }),
});
