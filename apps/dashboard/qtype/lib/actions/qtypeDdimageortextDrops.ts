"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeDdimageortextDrop,
  deleteQtypeDdimageortextDrop,
  updateQtypeDdimageortextDrop,
} from "@/lib/api/qtypeDdimageortextDrops/mutations";
import {
  QtypeDdimageortextDropId,
  NewQtypeDdimageortextDropParams,
  UpdateQtypeDdimageortextDropParams,
  qtypeDdimageortextDropIdSchema,
  insertQtypeDdimageortextDropParams,
  updateQtypeDdimageortextDropParams,
} from "@/lib/db/schema/qtypeDdimageortextDrops";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeDdimageortextDrops = () => revalidatePath("/qtype-ddimageortext-drops");

export const createQtypeDdimageortextDropAction = async (input: NewQtypeDdimageortextDropParams) => {
  try {
    const payload = insertQtypeDdimageortextDropParams.parse(input);
    await createQtypeDdimageortextDrop(payload);
    revalidateQtypeDdimageortextDrops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeDdimageortextDropAction = async (input: UpdateQtypeDdimageortextDropParams) => {
  try {
    const payload = updateQtypeDdimageortextDropParams.parse(input);
    await updateQtypeDdimageortextDrop(payload.id, payload);
    revalidateQtypeDdimageortextDrops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeDdimageortextDropAction = async (input: QtypeDdimageortextDropId) => {
  try {
    const payload = qtypeDdimageortextDropIdSchema.parse({ id: input });
    await deleteQtypeDdimageortextDrop(payload.id);
    revalidateQtypeDdimageortextDrops();
  } catch (e) {
    return handleErrors(e);
  }
};
