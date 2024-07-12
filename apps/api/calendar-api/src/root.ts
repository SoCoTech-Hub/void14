import { calendarRouter } from "./routers/calendar";
import { createTRPCRouter } from "./trpc";

export const appRouter: ReturnType<typeof createTRPCRouter> = createTRPCRouter({
  calendar: calendarRouter,
});

export type AppRouter = typeof appRouter;
