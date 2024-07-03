import { getNotificationById, getNotifications } from "@/lib/api/notifications/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  notificationIdSchema,
  insertNotificationParams,
  updateNotificationParams,
} from "@/lib/db/schema/notifications";
import { createNotification, deleteNotification, updateNotification } from "@/lib/api/notifications/mutations";

export const notificationsRouter = router({
  getNotifications: publicProcedure.query(async () => {
    return getNotifications();
  }),
  getNotificationById: publicProcedure.input(notificationIdSchema).query(async ({ input }) => {
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
