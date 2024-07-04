"use server";

import { revalidatePath } from "next/cache";

import {
  createCalendar,
  deleteCalendar,
  updateCalendar,
} from "../api/calendar/mutations";
import {
  CalendarId,
  calendarIdSchema,
  insertCalendarParams,
  NewCalendarParams,
  UpdateCalendarParams,
  updateCalendarParams,
} from "../db/schema/calendar";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCalendars = () => revalidatePath("/calendar");

export const createCalendarAction = async (input: NewCalendarParams) => {
  try {
    const payload = insertCalendarParams.parse(input);
    await createCalendar(payload);
    revalidateCalendars();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCalendarAction = async (input: UpdateCalendarParams) => {
  try {
    const payload = updateCalendarParams.parse(input);
    await updateCalendar(payload.id, payload);
    revalidateCalendars();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCalendarAction = async (input: CalendarId) => {
  try {
    const payload = calendarIdSchema.parse({ id: input });
    await deleteCalendar(payload.id);
    revalidateCalendars();
  } catch (e) {
    return handleErrors(e);
  }
};
