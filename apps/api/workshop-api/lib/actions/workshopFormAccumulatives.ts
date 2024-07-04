"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopFormAccumulative,
  deleteWorkshopFormAccumulative,
  updateWorkshopFormAccumulative,
} from "../api/workshopFormAccumulatives/mutations";
import {
  insertWorkshopFormAccumulativeParams,
  NewWorkshopFormAccumulativeParams,
  UpdateWorkshopFormAccumulativeParams,
  updateWorkshopFormAccumulativeParams,
  WorkshopFormAccumulativeId,
  workshopFormAccumulativeIdSchema,
} from "../db/schema/workshopFormAccumulatives";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopFormAccumulatives = () =>
  revalidatePath("/workshop-form-accumulatives");

export const createWorkshopFormAccumulativeAction = async (
  input: NewWorkshopFormAccumulativeParams,
) => {
  try {
    const payload = insertWorkshopFormAccumulativeParams.parse(input);
    await createWorkshopFormAccumulative(payload);
    revalidateWorkshopFormAccumulatives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopFormAccumulativeAction = async (
  input: UpdateWorkshopFormAccumulativeParams,
) => {
  try {
    const payload = updateWorkshopFormAccumulativeParams.parse(input);
    await updateWorkshopFormAccumulative(payload.id, payload);
    revalidateWorkshopFormAccumulatives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopFormAccumulativeAction = async (
  input: WorkshopFormAccumulativeId,
) => {
  try {
    const payload = workshopFormAccumulativeIdSchema.parse({ id: input });
    await deleteWorkshopFormAccumulative(payload.id);
    revalidateWorkshopFormAccumulatives();
  } catch (e) {
    return handleErrors(e);
  }
};
