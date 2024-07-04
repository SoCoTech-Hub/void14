"use server";

import { revalidatePath } from "next/cache";

import {
  createChoiceOption,
  deleteChoiceOption,
  updateChoiceOption,
} from "../api/choiceOptions/mutations";
import {
  ChoiceOptionId,
  choiceOptionIdSchema,
  insertChoiceOptionParams,
  NewChoiceOptionParams,
  UpdateChoiceOptionParams,
  updateChoiceOptionParams,
} from "../db/schema/choiceOptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChoiceOptions = () => revalidatePath("/choice-options");

export const createChoiceOptionAction = async (
  input: NewChoiceOptionParams,
) => {
  try {
    const payload = insertChoiceOptionParams.parse(input);
    await createChoiceOption(payload);
    revalidateChoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChoiceOptionAction = async (
  input: UpdateChoiceOptionParams,
) => {
  try {
    const payload = updateChoiceOptionParams.parse(input);
    await updateChoiceOption(payload.id, payload);
    revalidateChoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChoiceOptionAction = async (input: ChoiceOptionId) => {
  try {
    const payload = choiceOptionIdSchema.parse({ id: input });
    await deleteChoiceOption(payload.id);
    revalidateChoiceOptions();
  } catch (e) {
    return handleErrors(e);
  }
};
