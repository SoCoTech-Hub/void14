"use server";

import { revalidatePath } from "next/cache";

import {
  createQtypeDdimageortext,
  deleteQtypeDdimageortext,
  updateQtypeDdimageortext,
} from "../api/qtypeDdimageortexts/mutations";
import {
  insertQtypeDdimageortextParams,
  NewQtypeDdimageortextParams,
  QtypeDdimageortextId,
  qtypeDdimageortextIdSchema,
  UpdateQtypeDdimageortextParams,
  updateQtypeDdimageortextParams,
} from "../db/schema/qtypeDdimageortexts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdimageortexts = () =>
  revalidatePath("/qtype-ddimageortexts");

export const createQtypeDdimageortextAction = async (
  input: NewQtypeDdimageortextParams,
) => {
  try {
    const payload = insertQtypeDdimageortextParams.parse(input);
    await createQtypeDdimageortext(payload);
    revalidateQtypeDdimageortexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdimageortextAction = async (
  input: UpdateQtypeDdimageortextParams,
) => {
  try {
    const payload = updateQtypeDdimageortextParams.parse(input);
    await updateQtypeDdimageortext(payload.id, payload);
    revalidateQtypeDdimageortexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdimageortextAction = async (
  input: QtypeDdimageortextId,
) => {
  try {
    const payload = qtypeDdimageortextIdSchema.parse({ id: input });
    await deleteQtypeDdimageortext(payload.id);
    revalidateQtypeDdimageortexts();
  } catch (e) {
    return handleErrors(e);
  }
};
