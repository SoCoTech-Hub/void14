import EventsQueueList from "@/components/eventsQueues/EventsQueueList";
import NewEventsQueueModal from "@/components/eventsQueues/EventsQueueModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EventsQueues() {
  await checkAuth();
  const { eventsQueues } = await api.eventsQueues.getEventsQueues.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Events Queues</h1>
        <NewEventsQueueModal />
      </div>
      <EventsQueueList eventsQueues={eventsQueues} />
    </main>
  );
}
