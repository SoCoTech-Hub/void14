import { db } from "@soco/calendar-db/client";
import { eq, and } from "@soco/calendar-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type CalendarId, calendarIdSchema, calendar } from "@soco/calendar-db/schema/calendar";

export const getCalendars = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(calendar).where(eq(calendar.userId, session?.user.id!));
  const c = rows
  return { calendar: c };
};

export const getCalendarById = async (id: CalendarId) => {
  const { session } = await getUserAuth();
  const { id: calendarId } = calendarIdSchema.parse({ id });
  const [row] = await db.select().from(calendar).where(and(eq(calendar.id, calendarId), eq(calendar.userId, session?.user.id!)));
  if (row === undefined) return {};
  const c = row;
  return { calendar: c };
};


