"use server";

import { revalidatePath } from "next/cache";
import {
  createEventsQueue,
  deleteEventsQueue,
  updateEventsQueue,
} from "@/lib/api/eventsQueues/mutations";
import {
  EventsQueueId,
  NewEventsQueueParams,
  UpdateEventsQueueParams,
  eventsQueueIdSchema,
  insertEventsQueueParams,
  updateEventsQueueParams,
} from "@/lib/db/schema/eventsQueues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEventsQueues = () => revalidatePath("/events-queues");

export const createEventsQueueAction = async (input: NewEventsQueueParams) => {
  try {
    const payload = insertEventsQueueParams.parse(input);
    await createEventsQueue(payload);
    revalidateEventsQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEventsQueueAction = async (input: UpdateEventsQueueParams) => {
  try {
    const payload = updateEventsQueueParams.parse(input);
    await updateEventsQueue(payload.id, payload);
    revalidateEventsQueues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEventsQueueAction = async (input: EventsQueueId) => {
  try {
    const payload = eventsQueueIdSchema.parse({ id: input });
    await deleteEventsQueue(payload.id);
    revalidateEventsQueues();
  } catch (e) {
    return handleErrors(e);
  }
};
