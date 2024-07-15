"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetency,
  deleteCompetency,
  updateCompetency,
} from "@/lib/api/competencies/mutations";
import {
  CompetencyId,
  NewCompetencyParams,
  UpdateCompetencyParams,
  competencyIdSchema,
  insertCompetencyParams,
  updateCompetencyParams,
} from "@/lib/db/schema/competencies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencies = () => revalidatePath("/competencies");

export const createCompetencyAction = async (input: NewCompetencyParams) => {
  try {
    const payload = insertCompetencyParams.parse(input);
    await createCompetency(payload);
    revalidateCompetencies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyAction = async (input: UpdateCompetencyParams) => {
  try {
    const payload = updateCompetencyParams.parse(input);
    await updateCompetency(payload.id, payload);
    revalidateCompetencies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyAction = async (input: CompetencyId) => {
  try {
    const payload = competencyIdSchema.parse({ id: input });
    await deleteCompetency(payload.id);
    revalidateCompetencies();
  } catch (e) {
    return handleErrors(e);
  }
};
