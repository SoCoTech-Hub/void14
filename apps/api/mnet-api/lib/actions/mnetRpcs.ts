"use server";

import { revalidatePath } from "next/cache";

import {
  createMnetRpc,
  deleteMnetRpc,
  updateMnetRpc,
} from "../api/mnetRpcs/mutations";
import {
  insertMnetRpcParams,
  MnetRpcId,
  mnetRpcIdSchema,
  NewMnetRpcParams,
  UpdateMnetRpcParams,
  updateMnetRpcParams,
} from "../db/schema/mnetRpcs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetRpcs = () => revalidatePath("/mnet-rpcs");

export const createMnetRpcAction = async (input: NewMnetRpcParams) => {
  try {
    const payload = insertMnetRpcParams.parse(input);
    await createMnetRpc(payload);
    revalidateMnetRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetRpcAction = async (input: UpdateMnetRpcParams) => {
  try {
    const payload = updateMnetRpcParams.parse(input);
    await updateMnetRpc(payload.id, payload);
    revalidateMnetRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetRpcAction = async (input: MnetRpcId) => {
  try {
    const payload = mnetRpcIdSchema.parse({ id: input });
    await deleteMnetRpc(payload.id);
    revalidateMnetRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};
