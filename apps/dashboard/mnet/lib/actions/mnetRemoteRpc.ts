"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetRemoteRpc,
  deleteMnetRemoteRpc,
  updateMnetRemoteRpc,
} from "@/lib/api/mnetRemoteRpc/mutations";
import {
  MnetRemoteRpcId,
  NewMnetRemoteRpcParams,
  UpdateMnetRemoteRpcParams,
  mnetRemoteRpcIdSchema,
  insertMnetRemoteRpcParams,
  updateMnetRemoteRpcParams,
} from "@/lib/db/schema/mnetRemoteRpc";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetRemoteRpcs = () => revalidatePath("/mnet-remote-rpc");

export const createMnetRemoteRpcAction = async (input: NewMnetRemoteRpcParams) => {
  try {
    const payload = insertMnetRemoteRpcParams.parse(input);
    await createMnetRemoteRpc(payload);
    revalidateMnetRemoteRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetRemoteRpcAction = async (input: UpdateMnetRemoteRpcParams) => {
  try {
    const payload = updateMnetRemoteRpcParams.parse(input);
    await updateMnetRemoteRpc(payload.id, payload);
    revalidateMnetRemoteRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetRemoteRpcAction = async (input: MnetRemoteRpcId) => {
  try {
    const payload = mnetRemoteRpcIdSchema.parse({ id: input });
    await deleteMnetRemoteRpc(payload.id);
    revalidateMnetRemoteRpcs();
  } catch (e) {
    return handleErrors(e);
  }
};
