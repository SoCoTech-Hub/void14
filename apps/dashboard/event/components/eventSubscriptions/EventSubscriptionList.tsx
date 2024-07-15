"use client";
import { CompleteEventSubscription } from "@soco/event-db/schema/eventSubscriptions";
import { trpc } from "@/lib/trpc/client";
import EventSubscriptionModal from "./EventSubscriptionModal";


export default function EventSubscriptionList({ eventSubscriptions }: { eventSubscriptions: CompleteEventSubscription[] }) {
  const { data: e } = trpc.eventSubscriptions.getEventSubscriptions.useQuery(undefined, {
    initialData: { eventSubscriptions },
    refetchOnMount: false,
  });

  if (e.eventSubscriptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {e.eventSubscriptions.map((eventSubscription) => (
        <EventSubscription eventSubscription={eventSubscription} key={eventSubscription.id} />
      ))}
    </ul>
  );
}

const EventSubscription = ({ eventSubscription }: { eventSubscription: CompleteEventSubscription }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{eventSubscription.categoryId}</div>
      </div>
      <EventSubscriptionModal eventSubscription={eventSubscription} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No event subscriptions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new event subscription.
      </p>
      <div className="mt-6">
        <EventSubscriptionModal emptyState={true} />
      </div>
    </div>
  );
};

