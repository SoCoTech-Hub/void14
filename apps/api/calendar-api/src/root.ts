import { calendarRouter } from "./routers/calendar";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  calendar: calendarRouter,
});

export type AppRouter = typeof appRouter;
