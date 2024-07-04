"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyUserCompPlan,
  deleteCompetencyUserCompPlan,
  updateCompetencyUserCompPlan,
} from "../api/competencyUserCompPlans/mutations";
import {
  CompetencyUserCompPlanId,
  competencyUserCompPlanIdSchema,
  insertCompetencyUserCompPlanParams,
  NewCompetencyUserCompPlanParams,
  UpdateCompetencyUserCompPlanParams,
  updateCompetencyUserCompPlanParams,
} from "../db/schema/competencyUserCompPlans";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyUserCompPlans = () =>
  revalidatePath("/competency-user-comp-plans");

export const createCompetencyUserCompPlanAction = async (
  input: NewCompetencyUserCompPlanParams,
) => {
  try {
    const payload = insertCompetencyUserCompPlanParams.parse(input);
    await createCompetencyUserCompPlan(payload);
    revalidateCompetencyUserCompPlans();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyUserCompPlanAction = async (
  input: UpdateCompetencyUserCompPlanParams,
) => {
  try {
    const payload = updateCompetencyUserCompPlanParams.parse(input);
    await updateCompetencyUserCompPlan(payload.id, payload);
    revalidateCompetencyUserCompPlans();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyUserCompPlanAction = async (
  input: CompetencyUserCompPlanId,
) => {
  try {
    const payload = competencyUserCompPlanIdSchema.parse({ id: input });
    await deleteCompetencyUserCompPlan(payload.id);
    revalidateCompetencyUserCompPlans();
  } catch (e) {
    return handleErrors(e);
  }
};
