"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyUserEvidence,
  deleteCompetencyUserEvidence,
  updateCompetencyUserEvidence,
} from "@/lib/api/competencyUserEvidences/mutations";
import {
  CompetencyUserEvidenceId,
  NewCompetencyUserEvidenceParams,
  UpdateCompetencyUserEvidenceParams,
  competencyUserEvidenceIdSchema,
  insertCompetencyUserEvidenceParams,
  updateCompetencyUserEvidenceParams,
} from "@/lib/db/schema/competencyUserEvidences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyUserEvidences = () => revalidatePath("/competency-user-evidences");

export const createCompetencyUserEvidenceAction = async (input: NewCompetencyUserEvidenceParams) => {
  try {
    const payload = insertCompetencyUserEvidenceParams.parse(input);
    await createCompetencyUserEvidence(payload);
    revalidateCompetencyUserEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyUserEvidenceAction = async (input: UpdateCompetencyUserEvidenceParams) => {
  try {
    const payload = updateCompetencyUserEvidenceParams.parse(input);
    await updateCompetencyUserEvidence(payload.id, payload);
    revalidateCompetencyUserEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyUserEvidenceAction = async (input: CompetencyUserEvidenceId) => {
  try {
    const payload = competencyUserEvidenceIdSchema.parse({ id: input });
    await deleteCompetencyUserEvidence(payload.id);
    revalidateCompetencyUserEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};
