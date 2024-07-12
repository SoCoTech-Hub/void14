import {
  insertNotificationResponseParams,
  notificationResponseIdSchema,
  updateNotificationResponseParams,
} from "@soco/notification-db/schema/notificationResponses";

import {
  createNotificationResponse,
  deleteNotificationResponse,
  updateNotificationResponse,
} from "../api/notificationResponses/mutations";
import {
  getNotificationResponseById,
  getNotificationResponses,
} from "../api/notificationResponses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const notificationResponsesRouter = createTRPCRouter({
  getNotificationResponses: publicProcedure.query(async () => {
    return getNotificationResponses();
  }),
  getNotificationResponseById: publicProcedure
    .input(notificationResponseIdSchema)
    .query(async ({ input }) => {
      return getNotificationResponseById(input.id);
    }),
  createNotificationResponse: publicProcedure
    .input(insertNotificationResponseParams)
    .mutation(async ({ input }) => {
      return createNotificationResponse(input);
    }),
  updateNotificationResponse: publicProcedure
    .input(updateNotificationResponseParams)
    .mutation(async ({ input }) => {
      return updateNotificationResponse(input.id, input);
    }),
  deleteNotificationResponse: publicProcedure
    .input(notificationResponseIdSchema)
    .mutation(async ({ input }) => {
      return deleteNotificationResponse(input.id);
    }),
});
