"use server";

import { revalidatePath } from "next/cache";

import {
  createToolUserToursStep,
  deleteToolUserToursStep,
  updateToolUserToursStep,
} from "../api/toolUserToursSteps/mutations";
import {
  insertToolUserToursStepParams,
  NewToolUserToursStepParams,
  ToolUserToursStepId,
  toolUserToursStepIdSchema,
  UpdateToolUserToursStepParams,
  updateToolUserToursStepParams,
} from "../db/schema/toolUserToursSteps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolUserToursSteps = () =>
  revalidatePath("/tool-user-tours-steps");

export const createToolUserToursStepAction = async (
  input: NewToolUserToursStepParams,
) => {
  try {
    const payload = insertToolUserToursStepParams.parse(input);
    await createToolUserToursStep(payload);
    revalidateToolUserToursSteps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolUserToursStepAction = async (
  input: UpdateToolUserToursStepParams,
) => {
  try {
    const payload = updateToolUserToursStepParams.parse(input);
    await updateToolUserToursStep(payload.id, payload);
    revalidateToolUserToursSteps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolUserToursStepAction = async (
  input: ToolUserToursStepId,
) => {
  try {
    const payload = toolUserToursStepIdSchema.parse({ id: input });
    await deleteToolUserToursStep(payload.id);
    revalidateToolUserToursSteps();
  } catch (e) {
    return handleErrors(e);
  }
};
