"use server";

import { revalidatePath } from "next/cache";
import {
  createNotificationResponse,
  deleteNotificationResponse,
  updateNotificationResponse,
} from "@/lib/api/notificationResponses/mutations";
import {
  NotificationResponseId,
  NewNotificationResponseParams,
  UpdateNotificationResponseParams,
  notificationResponseIdSchema,
  insertNotificationResponseParams,
  updateNotificationResponseParams,
} from "@/lib/db/schema/notificationResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateNotificationResponses = () => revalidatePath("/notification-responses");

export const createNotificationResponseAction = async (input: NewNotificationResponseParams) => {
  try {
    const payload = insertNotificationResponseParams.parse(input);
    await createNotificationResponse(payload);
    revalidateNotificationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateNotificationResponseAction = async (input: UpdateNotificationResponseParams) => {
  try {
    const payload = updateNotificationResponseParams.parse(input);
    await updateNotificationResponse(payload.id, payload);
    revalidateNotificationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteNotificationResponseAction = async (input: NotificationResponseId) => {
  try {
    const payload = notificationResponseIdSchema.parse({ id: input });
    await deleteNotificationResponse(payload.id);
    revalidateNotificationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};