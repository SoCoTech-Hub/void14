"use server";

import { revalidatePath } from "next/cache";

import {
  createCompetencyUserCompCourse,
  deleteCompetencyUserCompCourse,
  updateCompetencyUserCompCourse,
} from "../api/competencyUserCompCourses/mutations";
import {
  CompetencyUserCompCourseId,
  competencyUserCompCourseIdSchema,
  insertCompetencyUserCompCourseParams,
  NewCompetencyUserCompCourseParams,
  UpdateCompetencyUserCompCourseParams,
  updateCompetencyUserCompCourseParams,
} from "../db/schema/competencyUserCompCourses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyUserCompCourses = () =>
  revalidatePath("/competency-user-comp-courses");

export const createCompetencyUserCompCourseAction = async (
  input: NewCompetencyUserCompCourseParams,
) => {
  try {
    const payload = insertCompetencyUserCompCourseParams.parse(input);
    await createCompetencyUserCompCourse(payload);
    revalidateCompetencyUserCompCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyUserCompCourseAction = async (
  input: UpdateCompetencyUserCompCourseParams,
) => {
  try {
    const payload = updateCompetencyUserCompCourseParams.parse(input);
    await updateCompetencyUserCompCourse(payload.id, payload);
    revalidateCompetencyUserCompCourses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyUserCompCourseAction = async (
  input: CompetencyUserCompCourseId,
) => {
  try {
    const payload = competencyUserCompCourseIdSchema.parse({ id: input });
    await deleteCompetencyUserCompCourse(payload.id);
    revalidateCompetencyUserCompCourses();
  } catch (e) {
    return handleErrors(e);
  }
};
