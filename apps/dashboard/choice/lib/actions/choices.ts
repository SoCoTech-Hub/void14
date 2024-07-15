"use server";

import { revalidatePath } from "next/cache";
import {
  createChoice,
  deleteChoice,
  updateChoice,
} from "@/lib/api/choices/mutations";
import {
  ChoiceId,
  NewChoiceParams,
  UpdateChoiceParams,
  choiceIdSchema,
  insertChoiceParams,
  updateChoiceParams,
} from "@/lib/db/schema/choices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChoices = () => revalidatePath("/choices");

export const createChoiceAction = async (input: NewChoiceParams) => {
  try {
    const payload = insertChoiceParams.parse(input);
    await createChoice(payload);
    revalidateChoices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChoiceAction = async (input: UpdateChoiceParams) => {
  try {
    const payload = updateChoiceParams.parse(input);
    await updateChoice(payload.id, payload);
    revalidateChoices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChoiceAction = async (input: ChoiceId) => {
  try {
    const payload = choiceIdSchema.parse({ id: input });
    await deleteChoice(payload.id);
    revalidateChoices();
  } catch (e) {
    return handleErrors(e);
  }
};
