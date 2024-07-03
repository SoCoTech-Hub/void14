import EventsHandlerList from "@/components/eventsHandlers/EventsHandlerList";
import NewEventsHandlerModal from "@/components/eventsHandlers/EventsHandlerModal";
import { api } from "@/lib/trpc/api";

export default async function EventsHandlers() {
  const { eventsHandlers } = await api.eventsHandlers.getEventsHandlers.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Events Handlers</h1>
        <NewEventsHandlerModal />
      </div>
      <EventsHandlerList eventsHandlers={eventsHandlers} />
    </main>
  );
}
