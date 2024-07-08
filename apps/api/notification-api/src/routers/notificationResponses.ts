import { getNotificationResponseById, getNotificationResponses } from "../api/notificationResponses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  notificationResponseIdSchema,
  insertNotificationResponseParams,
  updateNotificationResponseParams,
} from "@soco/notification-db/schema/notificationResponses";
import { createNotificationResponse, deleteNotificationResponse, updateNotificationResponse } from "../api/notificationResponses/mutations";

export const notificationResponsesRouter =createTRPCRouter({
  getNotificationResponses: publicProcedure.query(async () => {
    return getNotificationResponses();
  }),
  getNotificationResponseById: publicProcedure.input(notificationResponseIdSchema).query(async ({ input }) => {
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
