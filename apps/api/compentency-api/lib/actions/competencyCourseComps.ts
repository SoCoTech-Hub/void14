"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyCourseComp,
  deleteCompetencyCourseComp,
  updateCompetencyCourseComp,
} from "../api/competencyCourseComps/mutations";
import {
  CompetencyCourseCompId,
  competencyCourseCompIdSchema,
  insertCompetencyCourseCompParams,
  NewCompetencyCourseCompParams,
  UpdateCompetencyCourseCompParams,
  updateCompetencyCourseCompParams,
} from "../db/schema/competencyCourseComps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyCourseComps = () =>
  revalidatePath("/competency-course-comps");

export const createCompetencyCourseCompAction = async (
  input: NewCompetencyCourseCompParams,
) => {
  try {
    const payload = insertCompetencyCourseCompParams.parse(input);
    await createCompetencyCourseComp(payload);
    revalidateCompetencyCourseComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyCourseCompAction = async (
  input: UpdateCompetencyCourseCompParams,
) => {
  try {
    const payload = updateCompetencyCourseCompParams.parse(input);
    await updateCompetencyCourseComp(payload.id, payload);
    revalidateCompetencyCourseComps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyCourseCompAction = async (
  input: CompetencyCourseCompId,
) => {
  try {
    const payload = competencyCourseCompIdSchema.parse({ id: input });
    await deleteCompetencyCourseComp(payload.id);
    revalidateCompetencyCourseComps();
  } catch (e) {
    return handleErrors(e);
  }
};
