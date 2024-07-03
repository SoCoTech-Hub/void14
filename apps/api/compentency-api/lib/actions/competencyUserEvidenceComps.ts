"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyUserEvidenceComp,
  deleteCompetencyUserEvidenceComp,
  updateCompetencyUserEvidenceComp,
} from "@/lib/api/competencyUserEvidenceComps/mutations";
import {
  CompetencyUserEvidenceCompId,
  NewCompetencyUserEvidenceCompParams,
  UpdateCompetencyUserEvidenceCompParams,
  competencyUserEvidenceCompIdSchema,
  insertCompetencyUserEvidenceCompParams,
  updateCompetencyUserEvidenceCompParams,
} from "@/lib/db/schema/competencyUserEvidenceComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyUserEvidenceComps = () => revalidatePath("/competency-user-evidence-comps");

export const createCompetencyUserEvidenceCompAction = async (input: NewCompetencyUserEvidenceCompParams) => {
  try {
    const payload = insertCompetencyUserEvidenceCompParams.parse(input);
    await createCompetencyUserEvidenceComp(payload);
    revalidateCompetencyUserEvidenceComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyUserEvidenceCompAction = async (input: UpdateCompetencyUserEvidenceCompParams) => {
  try {
    const payload = updateCompetencyUserEvidenceCompParams.parse(input);
    await updateCompetencyUserEvidenceComp(payload.id, payload);
    revalidateCompetencyUserEvidenceComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyUserEvidenceCompAction = async (input: CompetencyUserEvidenceCompId) => {
  try {
    const payload = competencyUserEvidenceCompIdSchema.parse({ id: input });
    await deleteCompetencyUserEvidenceComp(payload.id);
    revalidateCompetencyUserEvidenceComps();
  } catch (e) {
    return handleErrors(e);
  }
};