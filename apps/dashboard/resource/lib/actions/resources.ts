"use server";

import { revalidatePath } from "next/cache";
import {
  createResource,
  deleteResource,
  updateResource,
} from "@/lib/api/resources/mutations";
import {
  ResourceId,
  NewResourceParams,
  UpdateResourceParams,
  resourceIdSchema,
  insertResourceParams,
  updateResourceParams,
} from "@/lib/db/schema/resources";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateResources = () => revalidatePath("/resources");

export const createResourceAction = async (input: NewResourceParams) => {
  try {
    const payload = insertResourceParams.parse(input);
    await createResource(payload);
    revalidateResources();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateResourceAction = async (input: UpdateResourceParams) => {
  try {
    const payload = updateResourceParams.parse(input);
    await updateResource(payload.id, payload);
    revalidateResources();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteResourceAction = async (input: ResourceId) => {
  try {
    const payload = resourceIdSchema.parse({ id: input });
    await deleteResource(payload.id);
    revalidateResources();
  } catch (e) {
    return handleErrors(e);
  }
};
