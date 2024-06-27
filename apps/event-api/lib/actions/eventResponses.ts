"use server";

import { revalidatePath } from "next/cache";
import {
  createEventResponse,
  deleteEventResponse,
  updateEventResponse,
} from "@/lib/api/eventResponses/mutations";
import {
  EventResponseId,
  NewEventResponseParams,
  UpdateEventResponseParams,
  eventResponseIdSchema,
  insertEventResponseParams,
  updateEventResponseParams,
} from "@/lib/db/schema/eventResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEventResponses = () => revalidatePath("/event-responses");

export const createEventResponseAction = async (input: NewEventResponseParams) => {
  try {
    const payload = insertEventResponseParams.parse(input);
    await createEventResponse(payload);
    revalidateEventResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEventResponseAction = async (input: UpdateEventResponseParams) => {
  try {
    const payload = updateEventResponseParams.parse(input);
    await updateEventResponse(payload.id, payload);
    revalidateEventResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEventResponseAction = async (input: EventResponseId) => {
  try {
    const payload = eventResponseIdSchema.parse({ id: input });
    await deleteEventResponse(payload.id);
    revalidateEventResponses();
  } catch (e) {
    return handleErrors(e);
  }
};