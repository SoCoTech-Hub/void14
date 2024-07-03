"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageAirnotifierDevice,
  deleteMessageAirnotifierDevice,
  updateMessageAirnotifierDevice,
} from "@/lib/api/messageAirnotifierDevices/mutations";
import {
  MessageAirnotifierDeviceId,
  NewMessageAirnotifierDeviceParams,
  UpdateMessageAirnotifierDeviceParams,
  messageAirnotifierDeviceIdSchema,
  insertMessageAirnotifierDeviceParams,
  updateMessageAirnotifierDeviceParams,
} from "@/lib/db/schema/messageAirnotifierDevices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageAirnotifierDevices = () => revalidatePath("/message-airnotifier-devices");

export const createMessageAirnotifierDeviceAction = async (input: NewMessageAirnotifierDeviceParams) => {
  try {
    const payload = insertMessageAirnotifierDeviceParams.parse(input);
    await createMessageAirnotifierDevice(payload);
    revalidateMessageAirnotifierDevices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageAirnotifierDeviceAction = async (input: UpdateMessageAirnotifierDeviceParams) => {
  try {
    const payload = updateMessageAirnotifierDeviceParams.parse(input);
    await updateMessageAirnotifierDevice(payload.id, payload);
    revalidateMessageAirnotifierDevices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageAirnotifierDeviceAction = async (input: MessageAirnotifierDeviceId) => {
  try {
    const payload = messageAirnotifierDeviceIdSchema.parse({ id: input });
    await deleteMessageAirnotifierDevice(payload.id);
    revalidateMessageAirnotifierDevices();
  } catch (e) {
    return handleErrors(e);
  }
};