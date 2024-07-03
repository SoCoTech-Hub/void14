"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopFormRubricLevel,
  deleteWorkshopFormRubricLevel,
  updateWorkshopFormRubricLevel,
} from "@/lib/api/workshopFormRubricLevels/mutations";
import {
  WorkshopFormRubricLevelId,
  NewWorkshopFormRubricLevelParams,
  UpdateWorkshopFormRubricLevelParams,
  workshopFormRubricLevelIdSchema,
  insertWorkshopFormRubricLevelParams,
  updateWorkshopFormRubricLevelParams,
} from "@/lib/db/schema/workshopFormRubricLevels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormRubricLevels = () => revalidatePath("/workshop-form-rubric-levels");

export const createWorkshopFormRubricLevelAction = async (input: NewWorkshopFormRubricLevelParams) => {
  try {
    const payload = insertWorkshopFormRubricLevelParams.parse(input);
    await createWorkshopFormRubricLevel(payload);
    revalidateWorkshopFormRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormRubricLevelAction = async (input: UpdateWorkshopFormRubricLevelParams) => {
  try {
    const payload = updateWorkshopFormRubricLevelParams.parse(input);
    await updateWorkshopFormRubricLevel(payload.id, payload);
    revalidateWorkshopFormRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormRubricLevelAction = async (input: WorkshopFormRubricLevelId) => {
  try {
    const payload = workshopFormRubricLevelIdSchema.parse({ id: input });
    await deleteWorkshopFormRubricLevel(payload.id);
    revalidateWorkshopFormRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};