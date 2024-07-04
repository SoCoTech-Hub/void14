import { router } from "../server/trpc";
import { computersRouter } from "./computers";
import { eventResponsesRouter } from "./eventResponses";
import { eventsRouter } from "./events";
import { eventsHandlersRouter } from "./eventsHandlers";
import { eventsQueueHandlersRouter } from "./eventsQueueHandlers";
import { eventsQueuesRouter } from "./eventsQueues";
import { eventSubscriptionsRouter } from "./eventSubscriptions";

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
