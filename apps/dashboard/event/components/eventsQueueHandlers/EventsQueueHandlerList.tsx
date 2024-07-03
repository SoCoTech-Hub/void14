"use client";
import { CompleteEventsQueueHandler } from "@/lib/db/schema/eventsQueueHandlers";
import { trpc } from "@/lib/trpc/client";
import EventsQueueHandlerModal from "./EventsQueueHandlerModal";


export default function EventsQueueHandlerList({ eventsQueueHandlers }: { eventsQueueHandlers: CompleteEventsQueueHandler[] }) {
  const { data: e } = trpc.eventsQueueHandlers.getEventsQueueHandlers.useQuery(undefined, {
    initialData: { eventsQueueHandlers },
    refetchOnMount: false,
  });

  if (e.eventsQueueHandlers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.eventsQueueHandlers.map((eventsQueueHandler) => (
        <EventsQueueHandler eventsQueueHandler={eventsQueueHandler} key={eventsQueueHandler.id} />
      ))}
    </ul>
  );
}

const EventsQueueHandler = ({ eventsQueueHandler }: { eventsQueueHandler: CompleteEventsQueueHandler }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{eventsQueueHandler.errorMessage}</div>
      </div>
      <EventsQueueHandlerModal eventsQueueHandler={eventsQueueHandler} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No events queue handlers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new events queue handler.
      </p>
      <div className="mt-6">
        <EventsQueueHandlerModal emptyState={true} />
      </div>
    </div>
  );
};

