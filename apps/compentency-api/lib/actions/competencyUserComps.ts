"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyUserComp,
  deleteCompetencyUserComp,
  updateCompetencyUserComp,
} from "@/lib/api/competencyUserComps/mutations";
import {
  CompetencyUserCompId,
  NewCompetencyUserCompParams,
  UpdateCompetencyUserCompParams,
  competencyUserCompIdSchema,
  insertCompetencyUserCompParams,
  updateCompetencyUserCompParams,
} from "@/lib/db/schema/competencyUserComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyUserComps = () => revalidatePath("/competency-user-comps");

export const createCompetencyUserCompAction = async (input: NewCompetencyUserCompParams) => {
  try {
    const payload = insertCompetencyUserCompParams.parse(input);
    await createCompetencyUserComp(payload);
    revalidateCompetencyUserComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyUserCompAction = async (input: UpdateCompetencyUserCompParams) => {
  try {
    const payload = updateCompetencyUserCompParams.parse(input);
    await updateCompetencyUserComp(payload.id, payload);
    revalidateCompetencyUserComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyUserCompAction = async (input: CompetencyUserCompId) => {
  try {
    const payload = competencyUserCompIdSchema.parse({ id: input });
    await deleteCompetencyUserComp(payload.id);
    revalidateCompetencyUserComps();
  } catch (e) {
    return handleErrors(e);
  }
};