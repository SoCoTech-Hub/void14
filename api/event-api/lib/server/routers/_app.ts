import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { eventsRouter } from "./events";
import { eventResponsesRouter } from "./eventResponses";
import { eventSubscriptionsRouter } from "./eventSubscriptions";
import { eventsHandlersRouter } from "./eventsHandlers";
import { eventsQueuesRouter } from "./eventsQueues";
import { eventsQueueHandlersRouter } from "./eventsQueueHandlers";

export const appRouter = router({
  computers: computersRouter,
  events: eventsRouter,
  eventResponses: eventResponsesRouter,
  eventSubscriptions: eventSubscriptionsRouter,
  eventsHandlers: eventsHandlersRouter,
  eventsQueues: eventsQueuesRouter,
  eventsQueueHandlers: eventsQueueHandlersRouter,
});

export type AppRouter = typeof appRouter;
