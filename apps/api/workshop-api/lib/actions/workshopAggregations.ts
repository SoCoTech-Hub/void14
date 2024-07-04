"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopAggregation,
  deleteWorkshopAggregation,
  updateWorkshopAggregation,
} from "../api/workshopAggregations/mutations";
import {
  insertWorkshopAggregationParams,
  NewWorkshopAggregationParams,
  UpdateWorkshopAggregationParams,
  updateWorkshopAggregationParams,
  WorkshopAggregationId,
  workshopAggregationIdSchema,
} from "../db/schema/workshopAggregations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopAggregations = () =>
  revalidatePath("/workshop-aggregations");

export const createWorkshopAggregationAction = async (
  input: NewWorkshopAggregationParams,
) => {
  try {
    const payload = insertWorkshopAggregationParams.parse(input);
    await createWorkshopAggregation(payload);
    revalidateWorkshopAggregations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopAggregationAction = async (
  input: UpdateWorkshopAggregationParams,
) => {
  try {
    const payload = updateWorkshopAggregationParams.parse(input);
    await updateWorkshopAggregation(payload.id, payload);
    revalidateWorkshopAggregations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopAggregationAction = async (
  input: WorkshopAggregationId,
) => {
  try {
    const payload = workshopAggregationIdSchema.parse({ id: input });
    await deleteWorkshopAggregation(payload.id);
    revalidateWorkshopAggregations();
  } catch (e) {
    return handleErrors(e);
  }
};
