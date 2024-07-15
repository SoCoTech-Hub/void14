"use server";

import { revalidatePath } from "next/cache";
import {
  createLabel,
  deleteLabel,
  updateLabel,
} from "@/lib/api/labels/mutations";
import {
  LabelId,
  NewLabelParams,
  UpdateLabelParams,
  labelIdSchema,
  insertLabelParams,
  updateLabelParams,
} from "@/lib/db/schema/labels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLabels = () => revalidatePath("/labels");

export const createLabelAction = async (input: NewLabelParams) => {
  try {
    const payload = insertLabelParams.parse(input);
    await createLabel(payload);
    revalidateLabels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLabelAction = async (input: UpdateLabelParams) => {
  try {
    const payload = updateLabelParams.parse(input);
    await updateLabel(payload.id, payload);
    revalidateLabels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLabelAction = async (input: LabelId) => {
  try {
    const payload = labelIdSchema.parse({ id: input });
    await deleteLabel(payload.id);
    revalidateLabels();
  } catch (e) {
    return handleErrors(e);
  }
};
