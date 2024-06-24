"use server";

import { revalidatePath } from "next/cache";
import {
  createQtypeRandomsamatchOption,
  deleteQtypeRandomsamatchOption,
  updateQtypeRandomsamatchOption,
} from "@/lib/api/qtypeRandomsamatchOptions/mutations";
import {
  QtypeRandomsamatchOptionId,
  NewQtypeRandomsamatchOptionParams,
  UpdateQtypeRandomsamatchOptionParams,
  qtypeRandomsamatchOptionIdSchema,
  insertQtypeRandomsamatchOptionParams,
  updateQtypeRandomsamatchOptionParams,
} from "@/lib/db/schema/qtypeRandomsamatchOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQtypeRandomsamatchOptions = () => revalidatePath("/qtype-randomsamatch-options");

export const createQtypeRandomsamatchOptionAction = async (input: NewQtypeRandomsamatchOptionParams) => {
  try {
    const payload = insertQtypeRandomsamatchOptionParams.parse(input);
    await createQtypeRandomsamatchOption(payload);
    revalidateQtypeRandomsamatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQtypeRandomsamatchOptionAction = async (input: UpdateQtypeRandomsamatchOptionParams) => {
  try {
    const payload = updateQtypeRandomsamatchOptionParams.parse(input);
    await updateQtypeRandomsamatchOption(payload.id, payload);
    revalidateQtypeRandomsamatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQtypeRandomsamatchOptionAction = async (input: QtypeRandomsamatchOptionId) => {
  try {
    const payload = qtypeRandomsamatchOptionIdSchema.parse({ id: input });
    await deleteQtypeRandomsamatchOption(payload.id);
    revalidateQtypeRandomsamatchOptions();
  } catch (e) {
    return handleErrors(e);
  }
};