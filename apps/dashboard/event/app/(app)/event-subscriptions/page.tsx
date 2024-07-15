import EventSubscriptionList from "@/components/eventSubscriptions/EventSubscriptionList";
import NewEventSubscriptionModal from "@/components/eventSubscriptions/EventSubscriptionModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EventSubscriptions() {
  await checkAuth();
  const { eventSubscriptions } = await api.eventSubscriptions.getEventSubscriptions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Event Subscriptions</h1>
        <NewEventSubscriptionModal />
      </div>
      <EventSubscriptionList eventSubscriptions={eventSubscriptions} />
    </main>
  );
}
