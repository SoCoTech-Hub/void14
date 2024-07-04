"use server";

import { revalidatePath } from "next/cache";

import { createImscp, deleteImscp, updateImscp } from "../api/imscps/mutations";
import {
  ImscpId,
  imscpIdSchema,
  insertImscpParams,
  NewImscpParams,
  UpdateImscpParams,
  updateImscpParams,
} from "../db/schema/imscps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateImscps = () => revalidatePath("/imscps");

export const createImscpAction = async (input: NewImscpParams) => {
  try {
    const payload = insertImscpParams.parse(input);
    await createImscp(payload);
    revalidateImscps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateImscpAction = async (input: UpdateImscpParams) => {
  try {
    const payload = updateImscpParams.parse(input);
    await updateImscp(payload.id, payload);
    revalidateImscps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteImscpAction = async (input: ImscpId) => {
  try {
    const payload = imscpIdSchema.parse({ id: input });
    await deleteImscp(payload.id);
    revalidateImscps();
  } catch (e) {
    return handleErrors(e);
  }
};
