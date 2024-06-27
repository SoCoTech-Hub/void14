"use server";

import { revalidatePath } from "next/cache";
import {
  createEventsQueueHandler,
  deleteEventsQueueHandler,
  updateEventsQueueHandler,
} from "@/lib/api/eventsQueueHandlers/mutations";
import {
  EventsQueueHandlerId,
  NewEventsQueueHandlerParams,
  UpdateEventsQueueHandlerParams,
  eventsQueueHandlerIdSchema,
  insertEventsQueueHandlerParams,
  updateEventsQueueHandlerParams,
} from "@/lib/db/schema/eventsQueueHandlers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEventsQueueHandlers = () => revalidatePath("/events-queue-handlers");

export const createEventsQueueHandlerAction = async (input: NewEventsQueueHandlerParams) => {
  try {
    const payload = insertEventsQueueHandlerParams.parse(input);
    await createEventsQueueHandler(payload);
    revalidateEventsQueueHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEventsQueueHandlerAction = async (input: UpdateEventsQueueHandlerParams) => {
  try {
    const payload = updateEventsQueueHandlerParams.parse(input);
    await updateEventsQueueHandler(payload.id, payload);
    revalidateEventsQueueHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEventsQueueHandlerAction = async (input: EventsQueueHandlerId) => {
  try {
    const payload = eventsQueueHandlerIdSchema.parse({ id: input });
    await deleteEventsQueueHandler(payload.id);
    revalidateEventsQueueHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};