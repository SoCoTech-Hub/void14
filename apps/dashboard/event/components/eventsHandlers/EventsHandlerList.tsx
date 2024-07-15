"use client";
import { CompleteEventsHandler } from "@soco/event-db/schema/eventsHandlers";
import { trpc } from "@/lib/trpc/client";
import EventsHandlerModal from "./EventsHandlerModal";


export default function EventsHandlerList({ eventsHandlers }: { eventsHandlers: CompleteEventsHandler[] }) {
  const { data: e } = trpc.eventsHandlers.getEventsHandlers.useQuery(undefined, {
    initialData: { eventsHandlers },
    refetchOnMount: false,
  });

  if (e.eventsHandlers.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.eventsHandlers.map((eventsHandler) => (
        <EventsHandler eventsHandler={eventsHandler} key={eventsHandler.id} />
      ))}
    </ul>
  );
}

const EventsHandler = ({ eventsHandler }: { eventsHandler: CompleteEventsHandler }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{eventsHandler.component}</div>
      </div>
      <EventsHandlerModal eventsHandler={eventsHandler} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No events handlers
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new events handler.
      </p>
      <div className="mt-6">
        <EventsHandlerModal emptyState={true} />
      </div>
    </div>
  );
};

