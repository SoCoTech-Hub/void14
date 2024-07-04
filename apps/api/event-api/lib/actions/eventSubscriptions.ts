"use server";

import { revalidatePath } from "next/cache";

import {
  createEventSubscription,
  deleteEventSubscription,
  updateEventSubscription,
} from "../api/eventSubscriptions/mutations";
import {
  EventSubscriptionId,
  eventSubscriptionIdSchema,
  insertEventSubscriptionParams,
  NewEventSubscriptionParams,
  UpdateEventSubscriptionParams,
  updateEventSubscriptionParams,
} from "../db/schema/eventSubscriptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEventSubscriptions = () =>
  revalidatePath("/event-subscriptions");

export const createEventSubscriptionAction = async (
  input: NewEventSubscriptionParams,
) => {
  try {
    const payload = insertEventSubscriptionParams.parse(input);
    await createEventSubscription(payload);
    revalidateEventSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEventSubscriptionAction = async (
  input: UpdateEventSubscriptionParams,
) => {
  try {
    const payload = updateEventSubscriptionParams.parse(input);
    await updateEventSubscription(payload.id, payload);
    revalidateEventSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEventSubscriptionAction = async (
  input: EventSubscriptionId,
) => {
  try {
    const payload = eventSubscriptionIdSchema.parse({ id: input });
    await deleteEventSubscription(payload.id);
    revalidateEventSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};
