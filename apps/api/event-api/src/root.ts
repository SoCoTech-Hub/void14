import { eventResponsesRouter } from "./routers/eventResponses";
import { eventsRouter } from "./routers/events";
import { eventsHandlersRouter } from "./routers/eventsHandlers";
import { eventsQueueHandlersRouter } from "./routers/eventsQueueHandlers";
import { eventsQueuesRouter } from "./routers/eventsQueues";
import { eventSubscriptionsRouter } from "./routers/eventSubscriptions";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  eventResponses: eventResponsesRouter,
  events: eventsRouter,
  eventsHandlers: eventsHandlersRouter,
  eventsQueueHandlers: eventsQueueHandlersRouter,
  eventsQueues: eventsQueuesRouter,
  eventSubscriptions: eventSubscriptionsRouter,
});

export type AppRouter = typeof appRouter;
