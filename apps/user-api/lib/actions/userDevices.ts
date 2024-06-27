"use server";

import { revalidatePath } from "next/cache";
import {
  createUserDevice,
  deleteUserDevice,
  updateUserDevice,
} from "@/lib/api/userDevices/mutations";
import {
  UserDeviceId,
  NewUserDeviceParams,
  UpdateUserDeviceParams,
  userDeviceIdSchema,
  insertUserDeviceParams,
  updateUserDeviceParams,
} from "@/lib/db/schema/userDevices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserDevices = () => revalidatePath("/user-devices");

export const createUserDeviceAction = async (input: NewUserDeviceParams) => {
  try {
    const payload = insertUserDeviceParams.parse(input);
    await createUserDevice(payload);
    revalidateUserDevices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserDeviceAction = async (input: UpdateUserDeviceParams) => {
  try {
    const payload = updateUserDeviceParams.parse(input);
    await updateUserDevice(payload.id, payload);
    revalidateUserDevices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserDeviceAction = async (input: UserDeviceId) => {
  try {
    const payload = userDeviceIdSchema.parse({ id: input });
    await deleteUserDevice(payload.id);
    revalidateUserDevices();
  } catch (e) {
    return handleErrors(e);
  }
};