"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyEvidence,
  deleteCompetencyEvidence,
  updateCompetencyEvidence,
} from "@/lib/api/competencyEvidences/mutations";
import {
  CompetencyEvidenceId,
  NewCompetencyEvidenceParams,
  UpdateCompetencyEvidenceParams,
  competencyEvidenceIdSchema,
  insertCompetencyEvidenceParams,
  updateCompetencyEvidenceParams,
} from "@/lib/db/schema/competencyEvidences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyEvidences = () => revalidatePath("/competency-evidences");

export const createCompetencyEvidenceAction = async (input: NewCompetencyEvidenceParams) => {
  try {
    const payload = insertCompetencyEvidenceParams.parse(input);
    await createCompetencyEvidence(payload);
    revalidateCompetencyEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyEvidenceAction = async (input: UpdateCompetencyEvidenceParams) => {
  try {
    const payload = updateCompetencyEvidenceParams.parse(input);
    await updateCompetencyEvidence(payload.id, payload);
    revalidateCompetencyEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyEvidenceAction = async (input: CompetencyEvidenceId) => {
  try {
    const payload = competencyEvidenceIdSchema.parse({ id: input });
    await deleteCompetencyEvidence(payload.id);
    revalidateCompetencyEvidences();
  } catch (e) {
    return handleErrors(e);
  }
};
