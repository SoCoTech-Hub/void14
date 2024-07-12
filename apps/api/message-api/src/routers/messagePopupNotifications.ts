import {
  insertMessagePopupNotificationParams,
  messagePopupNotificationIdSchema,
  updateMessagePopupNotificationParams,
} from "@soco/message-db/schema/messagePopupNotifications";

import {
  createMessagePopupNotification,
  deleteMessagePopupNotification,
  updateMessagePopupNotification,
} from "../api/messagePopupNotifications/mutations";
import {
  getMessagePopupNotificationById,
  getMessagePopupNotifications,
} from "../api/messagePopupNotifications/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messagePopupNotificationsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
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
