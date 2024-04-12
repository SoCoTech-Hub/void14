import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { eventsRouter } from "./events";
import { eventResponsesRouter } from "./eventResponses";

export const appRouter = router({
  computers: computersRouter,
  events: eventsRouter,
  eventResponses: eventResponsesRouter,
});

export type AppRouter = typeof appRouter;
