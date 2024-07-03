import { router } from '@/lib/server/trpc'
import { notificationsRouter } from "./notifications";
import { notificationResponsesRouter } from "./notificationResponses";

export const appRouter = router({
	notifications: notificationsRouter,
  notificationResponses: notificationResponsesRouter,
})

