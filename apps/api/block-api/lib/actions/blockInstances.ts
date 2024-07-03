"use server";

import { revalidatePath } from "next/cache";
import {
  createBlockInstance,
  deleteBlockInstance,
  updateBlockInstance,
} from "@/lib/api/blockInstances/mutations";
import {
  BlockInstanceId,
  NewBlockInstanceParams,
  UpdateBlockInstanceParams,
  blockInstanceIdSchema,
  insertBlockInstanceParams,
  updateBlockInstanceParams,
} from "@/lib/db/schema/blockInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBlockInstances = () => revalidatePath("/block-instances");

export const createBlockInstanceAction = async (input: NewBlockInstanceParams) => {
  try {
    const payload = insertBlockInstanceParams.parse(input);
    await createBlockInstance(payload);
    revalidateBlockInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBlockInstanceAction = async (input: UpdateBlockInstanceParams) => {
  try {
    const payload = updateBlockInstanceParams.parse(input);
    await updateBlockInstance(payload.id, payload);
    revalidateBlockInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBlockInstanceAction = async (input: BlockInstanceId) => {
  try {
    const payload = blockInstanceIdSchema.parse({ id: input });
    await deleteBlockInstance(payload.id);
    revalidateBlockInstances();
  } catch (e) {
    return handleErrors(e);
  }
};