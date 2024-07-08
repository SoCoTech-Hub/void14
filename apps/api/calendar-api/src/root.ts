import { createTRPCRouter } from "./trpc";

import { calendarRouter } from './routers/calendar';

export const appRouter = createTRPCRouter({
  calendar: calendarRouter,
});

export type AppRouter = typeof appRouter;
