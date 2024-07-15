"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeDdmarkerDrag,
  deleteQtypeDdmarkerDrag,
  updateQtypeDdmarkerDrag,
} from "@/lib/api/qtypeDdmarkerDrags/mutations";
import {
  QtypeDdmarkerDragId,
  NewQtypeDdmarkerDragParams,
  UpdateQtypeDdmarkerDragParams,
  qtypeDdmarkerDragIdSchema,
  insertQtypeDdmarkerDragParams,
  updateQtypeDdmarkerDragParams,
} from "@/lib/db/schema/qtypeDdmarkerDrags";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdmarkerDrags = () => revalidatePath("/qtype-ddmarker-drags");

export const createQtypeDdmarkerDragAction = async (input: NewQtypeDdmarkerDragParams) => {
  try {
    const payload = insertQtypeDdmarkerDragParams.parse(input);
    await createQtypeDdmarkerDrag(payload);
    revalidateQtypeDdmarkerDrags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdmarkerDragAction = async (input: UpdateQtypeDdmarkerDragParams) => {
  try {
    const payload = updateQtypeDdmarkerDragParams.parse(input);
    await updateQtypeDdmarkerDrag(payload.id, payload);
    revalidateQtypeDdmarkerDrags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdmarkerDragAction = async (input: QtypeDdmarkerDragId) => {
  try {
    const payload = qtypeDdmarkerDragIdSchema.parse({ id: input });
    await deleteQtypeDdmarkerDrag(payload.id);
    revalidateQtypeDdmarkerDrags();
  } catch (e) {
    return handleErrors(e);
  }
};
