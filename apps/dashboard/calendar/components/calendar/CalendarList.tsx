"use client";
import { CompleteCalendar } from "@soco/calendar-db/schema/calendar";
import { trpc } from "@/lib/trpc/client";
import CalendarModal from "./CalendarModal";


export default function CalendarList({ calendar }: { calendar: CompleteCalendar[] }) {
  const { data: c } = trpc.calendar.getCalendar.useQuery(undefined, {
    initialData: { calendar },
    refetchOnMount: false,
  });

  if (c.calendar.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {c.calendar.map((calendar) => (
        <Calendar calendar={calendar} key={calendar.id} />
      ))}
    </ul>
  );
}

const Calendar = ({ calendar }: { calendar: CompleteCalendar }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{calendar.name}</div>
      </div>
      <CalendarModal calendar={calendar} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No calendar
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new calendar.
      </p>
      <div className="mt-6">
        <CalendarModal emptyState={true} />
      </div>
    </div>
  );
};

