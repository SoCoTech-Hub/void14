"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopFormRubric,
  deleteWorkshopFormRubric,
  updateWorkshopFormRubric,
} from "@/lib/api/workshopFormRubrics/mutations";
import {
  WorkshopFormRubricId,
  NewWorkshopFormRubricParams,
  UpdateWorkshopFormRubricParams,
  workshopFormRubricIdSchema,
  insertWorkshopFormRubricParams,
  updateWorkshopFormRubricParams,
} from "@/lib/db/schema/workshopFormRubrics";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormRubrics = () => revalidatePath("/workshop-form-rubrics");

export const createWorkshopFormRubricAction = async (input: NewWorkshopFormRubricParams) => {
  try {
    const payload = insertWorkshopFormRubricParams.parse(input);
    await createWorkshopFormRubric(payload);
    revalidateWorkshopFormRubrics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormRubricAction = async (input: UpdateWorkshopFormRubricParams) => {
  try {
    const payload = updateWorkshopFormRubricParams.parse(input);
    await updateWorkshopFormRubric(payload.id, payload);
    revalidateWorkshopFormRubrics();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormRubricAction = async (input: WorkshopFormRubricId) => {
  try {
    const payload = workshopFormRubricIdSchema.parse({ id: input });
    await deleteWorkshopFormRubric(payload.id);
    revalidateWorkshopFormRubrics();
  } catch (e) {
    return handleErrors(e);
  }
};
