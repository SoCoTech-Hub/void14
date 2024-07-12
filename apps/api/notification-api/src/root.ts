import { notificationResponsesRouter } from "./routers/notificationResponses";
import { notificationsRouter } from "./routers/notifications";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  notificationResponses: notificationResponsesRouter,
  notifications: notificationsRouter,
});

export type AppRouter = typeof appRouter;
