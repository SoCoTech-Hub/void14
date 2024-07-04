"use server";

import { revalidatePath } from "next/cache";

import {
  createTagCorrelation,
  deleteTagCorrelation,
  updateTagCorrelation,
} from "../api/tagCorrelations/mutations";
import {
  insertTagCorrelationParams,
  NewTagCorrelationParams,
  TagCorrelationId,
  tagCorrelationIdSchema,
  UpdateTagCorrelationParams,
  updateTagCorrelationParams,
} from "../db/schema/tagCorrelations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTagCorrelations = () => revalidatePath("/tag-correlations");

export const createTagCorrelationAction = async (
  input: NewTagCorrelationParams,
) => {
  try {
    const payload = insertTagCorrelationParams.parse(input);
    await createTagCorrelation(payload);
    revalidateTagCorrelations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTagCorrelationAction = async (
  input: UpdateTagCorrelationParams,
) => {
  try {
    const payload = updateTagCorrelationParams.parse(input);
    await updateTagCorrelation(payload.id, payload);
    revalidateTagCorrelations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTagCorrelationAction = async (input: TagCorrelationId) => {
  try {
    const payload = tagCorrelationIdSchema.parse({ id: input });
    await deleteTagCorrelation(payload.id);
    revalidateTagCorrelations();
  } catch (e) {
    return handleErrors(e);
  }
};
