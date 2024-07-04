"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyModuleComp,
  deleteCompetencyModuleComp,
  updateCompetencyModuleComp,
} from "../api/competencyModuleComps/mutations";
import {
  CompetencyModuleCompId,
  competencyModuleCompIdSchema,
  insertCompetencyModuleCompParams,
  NewCompetencyModuleCompParams,
  UpdateCompetencyModuleCompParams,
  updateCompetencyModuleCompParams,
} from "../db/schema/competencyModuleComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyModuleComps = () =>
  revalidatePath("/competency-module-comps");

export const createCompetencyModuleCompAction = async (
  input: NewCompetencyModuleCompParams,
) => {
  try {
    const payload = insertCompetencyModuleCompParams.parse(input);
    await createCompetencyModuleComp(payload);
    revalidateCompetencyModuleComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyModuleCompAction = async (
  input: UpdateCompetencyModuleCompParams,
) => {
  try {
    const payload = updateCompetencyModuleCompParams.parse(input);
    await updateCompetencyModuleComp(payload.id, payload);
    revalidateCompetencyModuleComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyModuleCompAction = async (
  input: CompetencyModuleCompId,
) => {
  try {
    const payload = competencyModuleCompIdSchema.parse({ id: input });
    await deleteCompetencyModuleComp(payload.id);
    revalidateCompetencyModuleComps();
  } catch (e) {
    return handleErrors(e);
  }
};
