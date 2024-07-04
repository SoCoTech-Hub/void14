import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  CalendarId, 
  NewCalendarParams,
  UpdateCalendarParams, 
  updateCalendarSchema,
  insertCalendarSchema, 
  calendar,
  calendarIdSchema 
} from "@/lib/db/schema/calendar";
import { getUserAuth } from "@soco/auth/utils";

export const createCalendar = async (calendar: NewCalendarParams) => {
  const { session } = await getUserAuth();
  const newCalendar = insertCalendarSchema.parse({ ...calendar, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(calendar).values(newCalendar).returning();
    return { calendar: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCalendar = async (id: CalendarId, calendar: UpdateCalendarParams) => {
  const { session } = await getUserAuth();
  const { id: calendarId } = calendarIdSchema.parse({ id });
  const newCalendar = updateCalendarSchema.parse({ ...calendar, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(calendar)
     .set({...newCalendar, updatedAt: new Date() })
     .where(and(eq(calendar.id, calendarId!), eq(calendar.userId, session?.user.id!)))
     .returning();
    return { calendar: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCalendar = async (id: CalendarId) => {
  const { session } = await getUserAuth();
  const { id: calendarId } = calendarIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(calendar).where(and(eq(calendar.id, calendarId!), eq(calendar.userId, session?.user.id!)))
    .returning();
    return { calendar: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

