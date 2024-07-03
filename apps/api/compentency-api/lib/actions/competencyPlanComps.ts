"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyPlanComp,
  deleteCompetencyPlanComp,
  updateCompetencyPlanComp,
} from "@/lib/api/competencyPlanComps/mutations";
import {
  CompetencyPlanCompId,
  NewCompetencyPlanCompParams,
  UpdateCompetencyPlanCompParams,
  competencyPlanCompIdSchema,
  insertCompetencyPlanCompParams,
  updateCompetencyPlanCompParams,
} from "@/lib/db/schema/competencyPlanComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyPlanComps = () => revalidatePath("/competency-plan-comps");

export const createCompetencyPlanCompAction = async (input: NewCompetencyPlanCompParams) => {
  try {
    const payload = insertCompetencyPlanCompParams.parse(input);
    await createCompetencyPlanComp(payload);
    revalidateCompetencyPlanComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyPlanCompAction = async (input: UpdateCompetencyPlanCompParams) => {
  try {
    const payload = updateCompetencyPlanCompParams.parse(input);
    await updateCompetencyPlanComp(payload.id, payload);
    revalidateCompetencyPlanComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyPlanCompAction = async (input: CompetencyPlanCompId) => {
  try {
    const payload = competencyPlanCompIdSchema.parse({ id: input });
    await deleteCompetencyPlanComp(payload.id);
    revalidateCompetencyPlanComps();
  } catch (e) {
    return handleErrors(e);
  }
};