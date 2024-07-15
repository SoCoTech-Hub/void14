"use client";
import { CompleteEventsQueue } from "@soco/event-db/schema/eventsQueues";
import { trpc } from "@/lib/trpc/client";
import EventsQueueModal from "./EventsQueueModal";


export default function EventsQueueList({ eventsQueues }: { eventsQueues: CompleteEventsQueue[] }) {
  const { data: e } = trpc.eventsQueues.getEventsQueues.useQuery(undefined, {
    initialData: { eventsQueues },
    refetchOnMount: false,
  });

  if (e.eventsQueues.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.eventsQueues.map((eventsQueue) => (
        <EventsQueue eventsQueue={eventsQueue} key={eventsQueue.id} />
      ))}
    </ul>
  );
}

const EventsQueue = ({ eventsQueue }: { eventsQueue: CompleteEventsQueue }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{eventsQueue.eventData}</div>
      </div>
      <EventsQueueModal eventsQueue={eventsQueue} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No events queues
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new events queue.
      </p>
      <div className="mt-6">
        <EventsQueueModal emptyState={true} />
      </div>
    </div>
  );
};

