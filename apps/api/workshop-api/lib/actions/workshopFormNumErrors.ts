"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopFormNumError,
  deleteWorkshopFormNumError,
  updateWorkshopFormNumError,
} from "../api/workshopFormNumErrors/mutations";
import {
  insertWorkshopFormNumErrorParams,
  NewWorkshopFormNumErrorParams,
  UpdateWorkshopFormNumErrorParams,
  updateWorkshopFormNumErrorParams,
  WorkshopFormNumErrorId,
  workshopFormNumErrorIdSchema,
} from "../db/schema/workshopFormNumErrors";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormNumErrors = () =>
  revalidatePath("/workshop-form-num-errors");

export const createWorkshopFormNumErrorAction = async (
  input: NewWorkshopFormNumErrorParams,
) => {
  try {
    const payload = insertWorkshopFormNumErrorParams.parse(input);
    await createWorkshopFormNumError(payload);
    revalidateWorkshopFormNumErrors();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormNumErrorAction = async (
  input: UpdateWorkshopFormNumErrorParams,
) => {
  try {
    const payload = updateWorkshopFormNumErrorParams.parse(input);
    await updateWorkshopFormNumError(payload.id, payload);
    revalidateWorkshopFormNumErrors();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormNumErrorAction = async (
  input: WorkshopFormNumErrorId,
) => {
  try {
    const payload = workshopFormNumErrorIdSchema.parse({ id: input });
    await deleteWorkshopFormNumError(payload.id);
    revalidateWorkshopFormNumErrors();
  } catch (e) {
    return handleErrors(e);
  }
};
