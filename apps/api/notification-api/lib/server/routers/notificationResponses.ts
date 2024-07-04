import {
  createNotificationResponse,
  deleteNotificationResponse,
  updateNotificationResponse,
} from "../api/notificationResponses/mutations";
import {
  getNotificationResponseById,
  getNotificationResponses,
} from "../api/notificationResponses/queries";
import {
  insertNotificationResponseParams,
  notificationResponseIdSchema,
  updateNotificationResponseParams,
} from "../db/schema/notificationResponses";
import { publicProcedure, router } from "../server/trpc";

export const notificationResponsesRouter = router({
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
