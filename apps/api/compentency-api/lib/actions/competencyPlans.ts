"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyPlan,
  deleteCompetencyPlan,
  updateCompetencyPlan,
} from "@/lib/api/competencyPlans/mutations";
import {
  CompetencyPlanId,
  NewCompetencyPlanParams,
  UpdateCompetencyPlanParams,
  competencyPlanIdSchema,
  insertCompetencyPlanParams,
  updateCompetencyPlanParams,
} from "@/lib/db/schema/competencyPlans";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyPlans = () => revalidatePath("/competency-plans");

export const createCompetencyPlanAction = async (input: NewCompetencyPlanParams) => {
  try {
    const payload = insertCompetencyPlanParams.parse(input);
    await createCompetencyPlan(payload);
    revalidateCompetencyPlans();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyPlanAction = async (input: UpdateCompetencyPlanParams) => {
  try {
    const payload = updateCompetencyPlanParams.parse(input);
    await updateCompetencyPlan(payload.id, payload);
    revalidateCompetencyPlans();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyPlanAction = async (input: CompetencyPlanId) => {
  try {
    const payload = competencyPlanIdSchema.parse({ id: input });
    await deleteCompetencyPlan(payload.id);
    revalidateCompetencyPlans();
  } catch (e) {
    return handleErrors(e);
  }
};