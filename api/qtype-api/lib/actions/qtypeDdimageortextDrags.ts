"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeDdimageortextDrag,
  deleteQtypeDdimageortextDrag,
  updateQtypeDdimageortextDrag,
} from "@/lib/api/qtypeDdimageortextDrags/mutations";
import {
  QtypeDdimageortextDragId,
  NewQtypeDdimageortextDragParams,
  UpdateQtypeDdimageortextDragParams,
  qtypeDdimageortextDragIdSchema,
  insertQtypeDdimageortextDragParams,
  updateQtypeDdimageortextDragParams,
} from "@/lib/db/schema/qtypeDdimageortextDrags";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdimageortextDrags = () => revalidatePath("/qtype-ddimageortext-drags");

export const createQtypeDdimageortextDragAction = async (input: NewQtypeDdimageortextDragParams) => {
  try {
    const payload = insertQtypeDdimageortextDragParams.parse(input);
    await createQtypeDdimageortextDrag(payload);
    revalidateQtypeDdimageortextDrags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdimageortextDragAction = async (input: UpdateQtypeDdimageortextDragParams) => {
  try {
    const payload = updateQtypeDdimageortextDragParams.parse(input);
    await updateQtypeDdimageortextDrag(payload.id, payload);
    revalidateQtypeDdimageortextDrags();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdimageortextDragAction = async (input: QtypeDdimageortextDragId) => {
  try {
    const payload = qtypeDdimageortextDragIdSchema.parse({ id: input });
    await deleteQtypeDdimageortextDrag(payload.id);
    revalidateQtypeDdimageortextDrags();
  } catch (e) {
    return handleErrors(e);
  }
};