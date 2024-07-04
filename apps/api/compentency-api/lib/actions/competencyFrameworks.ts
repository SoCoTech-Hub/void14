"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyFramework,
  deleteCompetencyFramework,
  updateCompetencyFramework,
} from "../api/competencyFrameworks/mutations";
import {
  CompetencyFrameworkId,
  competencyFrameworkIdSchema,
  insertCompetencyFrameworkParams,
  NewCompetencyFrameworkParams,
  UpdateCompetencyFrameworkParams,
  updateCompetencyFrameworkParams,
} from "../db/schema/competencyFrameworks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyFrameworks = () =>
  revalidatePath("/competency-frameworks");

export const createCompetencyFrameworkAction = async (
  input: NewCompetencyFrameworkParams,
) => {
  try {
    const payload = insertCompetencyFrameworkParams.parse(input);
    await createCompetencyFramework(payload);
    revalidateCompetencyFrameworks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyFrameworkAction = async (
  input: UpdateCompetencyFrameworkParams,
) => {
  try {
    const payload = updateCompetencyFrameworkParams.parse(input);
    await updateCompetencyFramework(payload.id, payload);
    revalidateCompetencyFrameworks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyFrameworkAction = async (
  input: CompetencyFrameworkId,
) => {
  try {
    const payload = competencyFrameworkIdSchema.parse({ id: input });
    await deleteCompetencyFramework(payload.id);
    revalidateCompetencyFrameworks();
  } catch (e) {
    return handleErrors(e);
  }
};
