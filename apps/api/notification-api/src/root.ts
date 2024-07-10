import { notificationResponsesRouter } from './routers/notificationResponses';
import { notificationsRouter } from './routers/notifications';
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  notificationResponses: notificationResponsesRouter,
  notifications: notificationsRouter,
});

export type AppRouter = typeof appRouter;
