"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeDdmarkerDrop,
  deleteQtypeDdmarkerDrop,
  updateQtypeDdmarkerDrop,
} from "@/lib/api/qtypeDdmarkerDrops/mutations";
import {
  QtypeDdmarkerDropId,
  NewQtypeDdmarkerDropParams,
  UpdateQtypeDdmarkerDropParams,
  qtypeDdmarkerDropIdSchema,
  insertQtypeDdmarkerDropParams,
  updateQtypeDdmarkerDropParams,
} from "@/lib/db/schema/qtypeDdmarkerDrops";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdmarkerDrops = () => revalidatePath("/qtype-ddmarker-drops");

export const createQtypeDdmarkerDropAction = async (input: NewQtypeDdmarkerDropParams) => {
  try {
    const payload = insertQtypeDdmarkerDropParams.parse(input);
    await createQtypeDdmarkerDrop(payload);
    revalidateQtypeDdmarkerDrops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdmarkerDropAction = async (input: UpdateQtypeDdmarkerDropParams) => {
  try {
    const payload = updateQtypeDdmarkerDropParams.parse(input);
    await updateQtypeDdmarkerDrop(payload.id, payload);
    revalidateQtypeDdmarkerDrops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdmarkerDropAction = async (input: QtypeDdmarkerDropId) => {
  try {
    const payload = qtypeDdmarkerDropIdSchema.parse({ id: input });
    await deleteQtypeDdmarkerDrop(payload.id);
    revalidateQtypeDdmarkerDrops();
  } catch (e) {
    return handleErrors(e);
  }
};
