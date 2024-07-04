"use server";

import { revalidatePath } from "next/cache";

import {
  createGradingDefinition,
  deleteGradingDefinition,
  updateGradingDefinition,
} from "../api/gradingDefinitions/mutations";
import {
  GradingDefinitionId,
  gradingDefinitionIdSchema,
  insertGradingDefinitionParams,
  NewGradingDefinitionParams,
  UpdateGradingDefinitionParams,
  updateGradingDefinitionParams,
} from "../db/schema/gradingDefinitions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingDefinitions = () =>
  revalidatePath("/grading-definitions");

export const createGradingDefinitionAction = async (
  input: NewGradingDefinitionParams,
) => {
  try {
    const payload = insertGradingDefinitionParams.parse(input);
    await createGradingDefinition(payload);
    revalidateGradingDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingDefinitionAction = async (
  input: UpdateGradingDefinitionParams,
) => {
  try {
    const payload = updateGradingDefinitionParams.parse(input);
    await updateGradingDefinition(payload.id, payload);
    revalidateGradingDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingDefinitionAction = async (
  input: GradingDefinitionId,
) => {
  try {
    const payload = gradingDefinitionIdSchema.parse({ id: input });
    await deleteGradingDefinition(payload.id);
    revalidateGradingDefinitions();
  } catch (e) {
    return handleErrors(e);
  }
};
