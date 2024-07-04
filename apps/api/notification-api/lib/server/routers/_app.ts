import { router } from "../server/trpc";
import { notificationResponsesRouter } from "./notificationResponses";
import { notificationsRouter } from "./notifications";

export const appRouter = router({
  notifications: notificationsRouter,
  notificationResponses: notificationResponsesRouter,
});
