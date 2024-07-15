"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetRemoteService2rpc,
  deleteMnetRemoteService2rpc,
  updateMnetRemoteService2rpc,
} from "@/lib/api/mnetRemoteService2rpcs/mutations";
import {
  MnetRemoteService2rpcId,
  NewMnetRemoteService2rpcParams,
  UpdateMnetRemoteService2rpcParams,
  mnetRemoteService2rpcIdSchema,
  insertMnetRemoteService2rpcParams,
  updateMnetRemoteService2rpcParams,
} from "@/lib/db/schema/mnetRemoteService2rpcs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetRemoteService2rpcs = () => revalidatePath("/mnet-remote-service2rpcs");

export const createMnetRemoteService2rpcAction = async (input: NewMnetRemoteService2rpcParams) => {
  try {
    const payload = insertMnetRemoteService2rpcParams.parse(input);
    await createMnetRemoteService2rpc(payload);
    revalidateMnetRemoteService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetRemoteService2rpcAction = async (input: UpdateMnetRemoteService2rpcParams) => {
  try {
    const payload = updateMnetRemoteService2rpcParams.parse(input);
    await updateMnetRemoteService2rpc(payload.id, payload);
    revalidateMnetRemoteService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetRemoteService2rpcAction = async (input: MnetRemoteService2rpcId) => {
  try {
    const payload = mnetRemoteService2rpcIdSchema.parse({ id: input });
    await deleteMnetRemoteService2rpc(payload.id);
    revalidateMnetRemoteService2rpcs();
  } catch (e) {
    return handleErrors(e);
  }
};
