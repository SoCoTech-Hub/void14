import EventsQueueHandlerList from "@/components/eventsQueueHandlers/EventsQueueHandlerList";
import NewEventsQueueHandlerModal from "@/components/eventsQueueHandlers/EventsQueueHandlerModal";
import { api } from "@/lib/trpc/api";

export default async function EventsQueueHandlers() {
  const { eventsQueueHandlers } = await api.eventsQueueHandlers.getEventsQueueHandlers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Events Queue Handlers</h1>
        <NewEventsQueueHandlerModal />
      </div>
      <EventsQueueHandlerList eventsQueueHandlers={eventsQueueHandlers} />
    </main>
  );
}
