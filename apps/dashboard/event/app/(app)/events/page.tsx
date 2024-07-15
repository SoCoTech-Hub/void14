import EventList from "@/components/events/EventList";
import NewEventModal from "@/components/events/EventModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function Events() {
  await checkAuth();
  const { events } = await api.events.getEvents.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Events</h1>
        <NewEventModal />
      </div>
      <EventList events={events} />
    </main>
  );
}
