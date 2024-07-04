"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopFormNumErrorMap,
  deleteWorkshopFormNumErrorMap,
  updateWorkshopFormNumErrorMap,
} from "../api/workshopFormNumErrorMaps/mutations";
import {
  insertWorkshopFormNumErrorMapParams,
  NewWorkshopFormNumErrorMapParams,
  UpdateWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapParams,
  WorkshopFormNumErrorMapId,
  workshopFormNumErrorMapIdSchema,
} from "../db/schema/workshopFormNumErrorMaps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormNumErrorMaps = () =>
  revalidatePath("/workshop-form-num-error-maps");

export const createWorkshopFormNumErrorMapAction = async (
  input: NewWorkshopFormNumErrorMapParams,
) => {
  try {
    const payload = insertWorkshopFormNumErrorMapParams.parse(input);
    await createWorkshopFormNumErrorMap(payload);
    revalidateWorkshopFormNumErrorMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormNumErrorMapAction = async (
  input: UpdateWorkshopFormNumErrorMapParams,
) => {
  try {
    const payload = updateWorkshopFormNumErrorMapParams.parse(input);
    await updateWorkshopFormNumErrorMap(payload.id, payload);
    revalidateWorkshopFormNumErrorMaps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormNumErrorMapAction = async (
  input: WorkshopFormNumErrorMapId,
) => {
  try {
    const payload = workshopFormNumErrorMapIdSchema.parse({ id: input });
    await deleteWorkshopFormNumErrorMap(payload.id);
    revalidateWorkshopFormNumErrorMaps();
  } catch (e) {
    return handleErrors(e);
  }
};
