import { getNotificationById, getNotifications } from "../api/notifications/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  notificationIdSchema,
  insertNotificationParams,
  updateNotificationParams,
} from "@soco/notification-db/schema/notifications";
import { createNotification, deleteNotification, updateNotification } from "../api/notifications/mutations";

export const notificationsRouter =createTRPCRouter({
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
