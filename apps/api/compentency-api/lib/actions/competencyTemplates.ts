"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyTemplate,
  deleteCompetencyTemplate,
  updateCompetencyTemplate,
} from "../api/competencyTemplates/mutations";
import {
  CompetencyTemplateId,
  competencyTemplateIdSchema,
  insertCompetencyTemplateParams,
  NewCompetencyTemplateParams,
  UpdateCompetencyTemplateParams,
  updateCompetencyTemplateParams,
} from "../db/schema/competencyTemplates";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyTemplates = () =>
  revalidatePath("/competency-templates");

export const createCompetencyTemplateAction = async (
  input: NewCompetencyTemplateParams,
) => {
  try {
    const payload = insertCompetencyTemplateParams.parse(input);
    await createCompetencyTemplate(payload);
    revalidateCompetencyTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyTemplateAction = async (
  input: UpdateCompetencyTemplateParams,
) => {
  try {
    const payload = updateCompetencyTemplateParams.parse(input);
    await updateCompetencyTemplate(payload.id, payload);
    revalidateCompetencyTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyTemplateAction = async (
  input: CompetencyTemplateId,
) => {
  try {
    const payload = competencyTemplateIdSchema.parse({ id: input });
    await deleteCompetencyTemplate(payload.id);
    revalidateCompetencyTemplates();
  } catch (e) {
    return handleErrors(e);
  }
};
