"use client";
import { CompleteEventResponse } from "@/lib/db/schema/eventResponses";
import { trpc } from "@/lib/trpc/client";
import EventResponseModal from "./EventResponseModal";


export default function EventResponseList({ eventResponses }: { eventResponses: CompleteEventResponse[] }) {
  const { data: e } = trpc.eventResponses.getEventResponses.useQuery(undefined, {
    initialData: { eventResponses },
    refetchOnMount: false,
  });

  if (e.eventResponses.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.eventResponses.map((eventResponse) => (
        <EventResponse eventResponse={eventResponse} key={eventResponse.eventResponse.id} />
      ))}
    </ul>
  );
}

const EventResponse = ({ eventResponse }: { eventResponse: CompleteEventResponse }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{eventResponse.eventResponse.eventId}</div>
      </div>
      <EventResponseModal eventResponse={eventResponse.eventResponse} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No event responses
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new event response.
      </p>
      <div className="mt-6">
        <EventResponseModal emptyState={true} />
      </div>
    </div>
  );
};

