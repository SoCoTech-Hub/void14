"use server";

import { revalidatePath } from "next/cache";
import {
  createEventsHandler,
  deleteEventsHandler,
  updateEventsHandler,
} from "@/lib/api/eventsHandlers/mutations";
import {
  EventsHandlerId,
  NewEventsHandlerParams,
  UpdateEventsHandlerParams,
  eventsHandlerIdSchema,
  insertEventsHandlerParams,
  updateEventsHandlerParams,
} from "@/lib/db/schema/eventsHandlers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEventsHandlers = () => revalidatePath("/events-handlers");

export const createEventsHandlerAction = async (input: NewEventsHandlerParams) => {
  try {
    const payload = insertEventsHandlerParams.parse(input);
    await createEventsHandler(payload);
    revalidateEventsHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEventsHandlerAction = async (input: UpdateEventsHandlerParams) => {
  try {
    const payload = updateEventsHandlerParams.parse(input);
    await updateEventsHandler(payload.id, payload);
    revalidateEventsHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEventsHandlerAction = async (input: EventsHandlerId) => {
  try {
    const payload = eventsHandlerIdSchema.parse({ id: input });
    await deleteEventsHandler(payload.id);
    revalidateEventsHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};