import EventResponseList from "@/components/eventResponses/EventResponseList";
import NewEventResponseModal from "@/components/eventResponses/EventResponseModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@soco/auth-service";

export default async function EventResponses() {
  await checkAuth();
  const { eventResponses } = await api.eventResponses.getEventResponses.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Event Responses</h1>
        <NewEventResponseModal />
      </div>
      <EventResponseList eventResponses={eventResponses} />
    </main>
  );
}
