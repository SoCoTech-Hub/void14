"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyTemplateComp,
  deleteCompetencyTemplateComp,
  updateCompetencyTemplateComp,
} from "@/lib/api/competencyTemplateComps/mutations";
import {
  CompetencyTemplateCompId,
  NewCompetencyTemplateCompParams,
  UpdateCompetencyTemplateCompParams,
  competencyTemplateCompIdSchema,
  insertCompetencyTemplateCompParams,
  updateCompetencyTemplateCompParams,
} from "@/lib/db/schema/competencyTemplateComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyTemplateComps = () => revalidatePath("/competency-template-comps");

export const createCompetencyTemplateCompAction = async (input: NewCompetencyTemplateCompParams) => {
  try {
    const payload = insertCompetencyTemplateCompParams.parse(input);
    await createCompetencyTemplateComp(payload);
    revalidateCompetencyTemplateComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyTemplateCompAction = async (input: UpdateCompetencyTemplateCompParams) => {
  try {
    const payload = updateCompetencyTemplateCompParams.parse(input);
    await updateCompetencyTemplateComp(payload.id, payload);
    revalidateCompetencyTemplateComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyTemplateCompAction = async (input: CompetencyTemplateCompId) => {
  try {
    const payload = competencyTemplateCompIdSchema.parse({ id: input });
    await deleteCompetencyTemplateComp(payload.id);
    revalidateCompetencyTemplateComps();
  } catch (e) {
    return handleErrors(e);
  }
};