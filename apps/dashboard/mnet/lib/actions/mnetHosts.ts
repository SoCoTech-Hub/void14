"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetHost,
  deleteMnetHost,
  updateMnetHost,
} from "@/lib/api/mnetHosts/mutations";
import {
  MnetHostId,
  NewMnetHostParams,
  UpdateMnetHostParams,
  mnetHostIdSchema,
  insertMnetHostParams,
  updateMnetHostParams,
} from "@/lib/db/schema/mnetHosts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetHosts = () => revalidatePath("/mnet-hosts");

export const createMnetHostAction = async (input: NewMnetHostParams) => {
  try {
    const payload = insertMnetHostParams.parse(input);
    await createMnetHost(payload);
    revalidateMnetHosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetHostAction = async (input: UpdateMnetHostParams) => {
  try {
    const payload = updateMnetHostParams.parse(input);
    await updateMnetHost(payload.id, payload);
    revalidateMnetHosts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetHostAction = async (input: MnetHostId) => {
  try {
    const payload = mnetHostIdSchema.parse({ id: input });
    await deleteMnetHost(payload.id);
    revalidateMnetHosts();
  } catch (e) {
    return handleErrors(e);
  }
};