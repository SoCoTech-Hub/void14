import { createTRPCRouter } from "./trpc";

import { notificationResponsesRouter } from './routers/notificationResponses';
import { notificationsRouter } from './routers/notifications';

export const appRouter = createTRPCRouter({
  notificationResponses: notificationResponsesRouter,
  notifications: notificationsRouter,
});

export type AppRouter = typeof appRouter;
