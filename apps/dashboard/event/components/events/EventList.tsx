"use client";
import { CompleteEvent } from "@soco/event-db/schema/events";
import { trpc } from "@/lib/trpc/client";
import EventModal from "./EventModal";


export default function EventList({ events }: { events: CompleteEvent[] }) {
  const { data: e } = trpc.events.getEvents.useQuery(undefined, {
    initialData: { events },
    refetchOnMount: false,
  });

  if (e.events.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </ul>
  );
}

const Event = ({ event }: { event: CompleteEvent }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{event.categoryId}</div>
      </div>
      <EventModal event={event} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No events
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new event.
      </p>
      <div className="mt-6">
        <EventModal emptyState={true} />
      </div>
    </div>
  );
};

