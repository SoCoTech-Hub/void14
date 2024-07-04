"use server";

import { revalidatePath } from "next/cache";

import {
  createScormScoe,
  deleteScormScoe,
  updateScormScoe,
} from "../api/scormScoes/mutations";
import {
  insertScormScoeParams,
  NewScormScoeParams,
  ScormScoeId,
  scormScoeIdSchema,
  UpdateScormScoeParams,
  updateScormScoeParams,
} from "../db/schema/scormScoes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormScoes = () => revalidatePath("/scorm-scoes");

export const createScormScoeAction = async (input: NewScormScoeParams) => {
  try {
    const payload = insertScormScoeParams.parse(input);
    await createScormScoe(payload);
    revalidateScormScoes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormScoeAction = async (input: UpdateScormScoeParams) => {
  try {
    const payload = updateScormScoeParams.parse(input);
    await updateScormScoe(payload.id, payload);
    revalidateScormScoes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormScoeAction = async (input: ScormScoeId) => {
  try {
    const payload = scormScoeIdSchema.parse({ id: input });
    await deleteScormScoe(payload.id);
    revalidateScormScoes();
  } catch (e) {
    return handleErrors(e);
  }
};
