"use server";

import { revalidatePath } from "next/cache";
import {
  createCohort,
  deleteCohort,
  updateCohort,
} from "@/lib/api/cohorts/mutations";
import {
  CohortId,
  NewCohortParams,
  UpdateCohortParams,
  cohortIdSchema,
  insertCohortParams,
  updateCohortParams,
} from "@/lib/db/schema/cohorts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCohorts = () => revalidatePath("/cohorts");

export const createCohortAction = async (input: NewCohortParams) => {
  try {
    const payload = insertCohortParams.parse(input);
    await createCohort(payload);
    revalidateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCohortAction = async (input: UpdateCohortParams) => {
  try {
    const payload = updateCohortParams.parse(input);
    await updateCohort(payload.id, payload);
    revalidateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCohortAction = async (input: CohortId) => {
  try {
    const payload = cohortIdSchema.parse({ id: input });
    await deleteCohort(payload.id);
    revalidateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};
