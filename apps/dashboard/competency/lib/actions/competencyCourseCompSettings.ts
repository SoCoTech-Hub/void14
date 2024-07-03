"use server";

import { revalidatePath } from "next/cache";
import {
  createCompetencyCourseCompSetting,
  deleteCompetencyCourseCompSetting,
  updateCompetencyCourseCompSetting,
} from "@/lib/api/competencyCourseCompSettings/mutations";
import {
  CompetencyCourseCompSettingId,
  NewCompetencyCourseCompSettingParams,
  UpdateCompetencyCourseCompSettingParams,
  competencyCourseCompSettingIdSchema,
  insertCompetencyCourseCompSettingParams,
  updateCompetencyCourseCompSettingParams,
} from "@/lib/db/schema/competencyCourseCompSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCompetencyCourseCompSettings = () => revalidatePath("/competency-course-comp-settings");

export const createCompetencyCourseCompSettingAction = async (input: NewCompetencyCourseCompSettingParams) => {
  try {
    const payload = insertCompetencyCourseCompSettingParams.parse(input);
    await createCompetencyCourseCompSetting(payload);
    revalidateCompetencyCourseCompSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCompetencyCourseCompSettingAction = async (input: UpdateCompetencyCourseCompSettingParams) => {
  try {
    const payload = updateCompetencyCourseCompSettingParams.parse(input);
    await updateCompetencyCourseCompSetting(payload.id, payload);
    revalidateCompetencyCourseCompSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCompetencyCourseCompSettingAction = async (input: CompetencyCourseCompSettingId) => {
  try {
    const payload = competencyCourseCompSettingIdSchema.parse({ id: input });
    await deleteCompetencyCourseCompSetting(payload.id);
    revalidateCompetencyCourseCompSettings();
  } catch (e) {
    return handleErrors(e);
  }
};