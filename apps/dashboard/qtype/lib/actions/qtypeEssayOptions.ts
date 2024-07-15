"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeEssayOption,
  deleteQtypeEssayOption,
  updateQtypeEssayOption,
} from "@/lib/api/qtypeEssayOptions/mutations";
import {
  QtypeEssayOptionId,
  NewQtypeEssayOptionParams,
  UpdateQtypeEssayOptionParams,
  qtypeEssayOptionIdSchema,
  insertQtypeEssayOptionParams,
  updateQtypeEssayOptionParams,
} from "@/lib/db/schema/qtypeEssayOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeEssayOptions = () => revalidatePath("/qtype-essay-options");

export const createQtypeEssayOptionAction = async (input: NewQtypeEssayOptionParams) => {
  try {
    const payload = insertQtypeEssayOptionParams.parse(input);
    await createQtypeEssayOption(payload);
    revalidateQtypeEssayOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeEssayOptionAction = async (input: UpdateQtypeEssayOptionParams) => {
  try {
    const payload = updateQtypeEssayOptionParams.parse(input);
    await updateQtypeEssayOption(payload.id, payload);
    revalidateQtypeEssayOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeEssayOptionAction = async (input: QtypeEssayOptionId) => {
  try {
    const payload = qtypeEssayOptionIdSchema.parse({ id: input });
    await deleteQtypeEssayOption(payload.id);
    revalidateQtypeEssayOptions();
  } catch (e) {
    return handleErrors(e);
  }
};
