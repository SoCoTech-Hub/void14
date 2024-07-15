"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyRelatedComp,
  deleteCompetencyRelatedComp,
  updateCompetencyRelatedComp,
} from "@/lib/api/competencyRelatedComps/mutations";
import {
  CompetencyRelatedCompId,
  NewCompetencyRelatedCompParams,
  UpdateCompetencyRelatedCompParams,
  competencyRelatedCompIdSchema,
  insertCompetencyRelatedCompParams,
  updateCompetencyRelatedCompParams,
} from "@/lib/db/schema/competencyRelatedComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyRelatedComps = () => revalidatePath("/competency-related-comps");

export const createCompetencyRelatedCompAction = async (input: NewCompetencyRelatedCompParams) => {
  try {
    const payload = insertCompetencyRelatedCompParams.parse(input);
    await createCompetencyRelatedComp(payload);
    revalidateCompetencyRelatedComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyRelatedCompAction = async (input: UpdateCompetencyRelatedCompParams) => {
  try {
    const payload = updateCompetencyRelatedCompParams.parse(input);
    await updateCompetencyRelatedComp(payload.id, payload);
    revalidateCompetencyRelatedComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyRelatedCompAction = async (input: CompetencyRelatedCompId) => {
  try {
    const payload = competencyRelatedCompIdSchema.parse({ id: input });
    await deleteCompetencyRelatedComp(payload.id);
    revalidateCompetencyRelatedComps();
  } catch (e) {
    return handleErrors(e);
  }
};
