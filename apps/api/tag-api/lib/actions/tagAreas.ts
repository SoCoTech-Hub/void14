"use server";

import { revalidatePath } from "next/cache";

import {
  createTagArea,
  deleteTagArea,
  updateTagArea,
} from "../api/tagAreas/mutations";
import {
  insertTagAreaParams,
  NewTagAreaParams,
  TagAreaId,
  tagAreaIdSchema,
  UpdateTagAreaParams,
  updateTagAreaParams,
} from "../db/schema/tagAreas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTagAreas = () => revalidatePath("/tag-areas");

export const createTagAreaAction = async (input: NewTagAreaParams) => {
  try {
    const payload = insertTagAreaParams.parse(input);
    await createTagArea(payload);
    revalidateTagAreas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTagAreaAction = async (input: UpdateTagAreaParams) => {
  try {
    const payload = updateTagAreaParams.parse(input);
    await updateTagArea(payload.id, payload);
    revalidateTagAreas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTagAreaAction = async (input: TagAreaId) => {
  try {
    const payload = tagAreaIdSchema.parse({ id: input });
    await deleteTagArea(payload.id);
    revalidateTagAreas();
  } catch (e) {
    return handleErrors(e);
  }
};
