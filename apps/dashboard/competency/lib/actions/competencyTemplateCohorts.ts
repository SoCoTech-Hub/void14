"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyTemplateCohort,
  deleteCompetencyTemplateCohort,
  updateCompetencyTemplateCohort,
} from "@/lib/api/competencyTemplateCohorts/mutations";
import {
  CompetencyTemplateCohortId,
  NewCompetencyTemplateCohortParams,
  UpdateCompetencyTemplateCohortParams,
  competencyTemplateCohortIdSchema,
  insertCompetencyTemplateCohortParams,
  updateCompetencyTemplateCohortParams,
} from "@/lib/db/schema/competencyTemplateCohorts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyTemplateCohorts = () => revalidatePath("/competency-template-cohorts");

export const createCompetencyTemplateCohortAction = async (input: NewCompetencyTemplateCohortParams) => {
  try {
    const payload = insertCompetencyTemplateCohortParams.parse(input);
    await createCompetencyTemplateCohort(payload);
    revalidateCompetencyTemplateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyTemplateCohortAction = async (input: UpdateCompetencyTemplateCohortParams) => {
  try {
    const payload = updateCompetencyTemplateCohortParams.parse(input);
    await updateCompetencyTemplateCohort(payload.id, payload);
    revalidateCompetencyTemplateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyTemplateCohortAction = async (input: CompetencyTemplateCohortId) => {
  try {
    const payload = competencyTemplateCohortIdSchema.parse({ id: input });
    await deleteCompetencyTemplateCohort(payload.id);
    revalidateCompetencyTemplateCohorts();
  } catch (e) {
    return handleErrors(e);
  }
};
