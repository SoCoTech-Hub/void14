import { getNotificationResponseById, getNotificationResponses } from "@/lib/api/notificationResponses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  notificationResponseIdSchema,
  insertNotificationResponseParams,
  updateNotificationResponseParams,
} from "@/lib/db/schema/notificationResponses";
import { createNotificationResponse, deleteNotificationResponse, updateNotificationResponse } from "@/lib/api/notificationResponses/mutations";

export const notificationResponsesRouter = router({
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
