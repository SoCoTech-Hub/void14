"use server";

import { revalidatePath } from "next/cache";

import {
  createMnetService2rpc,
  deleteMnetService2rpc,
  updateMnetService2rpc,
} from "../api/mnetService2rpcs/mutations";
import {
  insertMnetService2rpcParams,
  MnetService2rpcId,
  mnetService2rpcIdSchema,
  NewMnetService2rpcParams,
  UpdateMnetService2rpcParams,
  updateMnetService2rpcParams,
} from "../db/schema/mnetService2rpcs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetService2rpcs = () => revalidatePath("/mnet-service2rpcs");

export const createMnetService2rpcAction = async (
  input: NewMnetService2rpcParams,
) => {
  try {
    const payload = insertMnetService2rpcParams.parse(input);
    await createMnetService2rpc(payload);
    revalidateMnetService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetService2rpcAction = async (
  input: UpdateMnetService2rpcParams,
) => {
  try {
    const payload = updateMnetService2rpcParams.parse(input);
    await updateMnetService2rpc(payload.id, payload);
    revalidateMnetService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetService2rpcAction = async (input: MnetService2rpcId) => {
  try {
    const payload = mnetService2rpcIdSchema.parse({ id: input });
    await deleteMnetService2rpc(payload.id);
    revalidateMnetService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};
