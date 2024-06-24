"use server";

import { revalidatePath } from "next/cache";
import {
  createResourceOld,
  deleteResourceOld,
  updateResourceOld,
} from "@/lib/api/resourceOlds/mutations";
import {
  ResourceOldId,
  NewResourceOldParams,
  UpdateResourceOldParams,
  resourceOldIdSchema,
  insertResourceOldParams,
  updateResourceOldParams,
} from "@/lib/db/schema/resourceOlds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateResourceOlds = () => revalidatePath("/resource-olds");

export const createResourceOldAction = async (input: NewResourceOldParams) => {
  try {
    const payload = insertResourceOldParams.parse(input);
    await createResourceOld(payload);
    revalidateResourceOlds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateResourceOldAction = async (input: UpdateResourceOldParams) => {
  try {
    const payload = updateResourceOldParams.parse(input);
    await updateResourceOld(payload.id, payload);
    revalidateResourceOlds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteResourceOldAction = async (input: ResourceOldId) => {
  try {
    const payload = resourceOldIdSchema.parse({ id: input });
    await deleteResourceOld(payload.id);
    revalidateResourceOlds();
  } catch (e) {
    return handleErrors(e);
  }
};