"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopFormRubricConfig,
  deleteWorkshopFormRubricConfig,
  updateWorkshopFormRubricConfig,
} from "@/lib/api/workshopFormRubricConfigs/mutations";
import {
  WorkshopFormRubricConfigId,
  NewWorkshopFormRubricConfigParams,
  UpdateWorkshopFormRubricConfigParams,
  workshopFormRubricConfigIdSchema,
  insertWorkshopFormRubricConfigParams,
  updateWorkshopFormRubricConfigParams,
} from "@/lib/db/schema/workshopFormRubricConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormRubricConfigs = () => revalidatePath("/workshop-form-rubric-configs");

export const createWorkshopFormRubricConfigAction = async (input: NewWorkshopFormRubricConfigParams) => {
  try {
    const payload = insertWorkshopFormRubricConfigParams.parse(input);
    await createWorkshopFormRubricConfig(payload);
    revalidateWorkshopFormRubricConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormRubricConfigAction = async (input: UpdateWorkshopFormRubricConfigParams) => {
  try {
    const payload = updateWorkshopFormRubricConfigParams.parse(input);
    await updateWorkshopFormRubricConfig(payload.id, payload);
    revalidateWorkshopFormRubricConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormRubricConfigAction = async (input: WorkshopFormRubricConfigId) => {
  try {
    const payload = workshopFormRubricConfigIdSchema.parse({ id: input });
    await deleteWorkshopFormRubricConfig(payload.id);
    revalidateWorkshopFormRubricConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};