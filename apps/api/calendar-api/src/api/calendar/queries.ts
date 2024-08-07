import type { CalendarId } from "@soco/calendar-db/schema/calendar";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/calendar-db";
import { db } from "@soco/calendar-db/client";
import { calendar, calendarIdSchema } from "@soco/calendar-db/schema/calendar";

export const getCalendars = async () => {
  const { Session: session } = await getUserAuth();
  const rows = await db
    .select()
    .from(calendar)
    .where(eq(calendar.userId, session?.user.id!));
  const c = rows;
  return { calendar: c };
};

export const getCalendarById = async (id: CalendarId) => {
  const { Session: session } = await getUserAuth();
  const { id: calendarId } = calendarIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(calendar)
    .where(
      and(eq(calendar.id, calendarId), eq(calendar.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const c = row;
  return { calendar: c };
};
