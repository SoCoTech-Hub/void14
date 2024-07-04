"use server";

import { revalidatePath } from "next/cache";

import {
  createQtypeDdmarker,
  deleteQtypeDdmarker,
  updateQtypeDdmarker,
} from "../api/qtypeDdmarkers/mutations";
import {
  insertQtypeDdmarkerParams,
  NewQtypeDdmarkerParams,
  QtypeDdmarkerId,
  qtypeDdmarkerIdSchema,
  UpdateQtypeDdmarkerParams,
  updateQtypeDdmarkerParams,
} from "../db/schema/qtypeDdmarkers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdmarkers = () => revalidatePath("/qtype-ddmarkers");

export const createQtypeDdmarkerAction = async (
  input: NewQtypeDdmarkerParams,
) => {
  try {
    const payload = insertQtypeDdmarkerParams.parse(input);
    await createQtypeDdmarker(payload);
    revalidateQtypeDdmarkers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdmarkerAction = async (
  input: UpdateQtypeDdmarkerParams,
) => {
  try {
    const payload = updateQtypeDdmarkerParams.parse(input);
    await updateQtypeDdmarker(payload.id, payload);
    revalidateQtypeDdmarkers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdmarkerAction = async (input: QtypeDdmarkerId) => {
  try {
    const payload = qtypeDdmarkerIdSchema.parse({ id: input });
    await deleteQtypeDdmarker(payload.id);
    revalidateQtypeDdmarkers();
  } catch (e) {
    return handleErrors(e);
  }
};
