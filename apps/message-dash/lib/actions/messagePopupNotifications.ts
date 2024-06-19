"use server";

import { revalidatePath } from "next/cache";
import {
  createMessagePopupNotification,
  deleteMessagePopupNotification,
  updateMessagePopupNotification,
} from "@/lib/api/messagePopupNotifications/mutations";
import {
  MessagePopupNotificationId,
  NewMessagePopupNotificationParams,
  UpdateMessagePopupNotificationParams,
  messagePopupNotificationIdSchema,
  insertMessagePopupNotificationParams,
  updateMessagePopupNotificationParams,
} from "@/lib/db/schema/messagePopupNotifications";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessagePopupNotifications = () => revalidatePath("/message-popup-notifications");

export const createMessagePopupNotificationAction = async (input: NewMessagePopupNotificationParams) => {
  try {
    const payload = insertMessagePopupNotificationParams.parse(input);
    await createMessagePopupNotification(payload);
    revalidateMessagePopupNotifications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessagePopupNotificationAction = async (input: UpdateMessagePopupNotificationParams) => {
  try {
    const payload = updateMessagePopupNotificationParams.parse(input);
    await updateMessagePopupNotification(payload.id, payload);
    revalidateMessagePopupNotifications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessagePopupNotificationAction = async (input: MessagePopupNotificationId) => {
  try {
    const payload = messagePopupNotificationIdSchema.parse({ id: input });
    await deleteMessagePopupNotification(payload.id);
    revalidateMessagePopupNotifications();
  } catch (e) {
    return handleErrors(e);
  }
};