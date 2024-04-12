import CalendarList from "@/components/calendar/CalendarList";
import NewCalendarModal from "@/components/calendar/CalendarModal";
import { api } from "@/lib/trpc/api";
import { checkAuth } from "@/lib/auth/utils";

export default async function Calendar() {
  await checkAuth();
  const { calendar } = await api.calendar.getCalendar.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Calendar</h1>
        <NewCalendarModal />
      </div>
      <CalendarList calendar={calendar} />
    </main>
  );
}
