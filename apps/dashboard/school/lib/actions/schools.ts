"use server";

import { revalidatePath } from "next/cache";
import {
  createSchool,
  deleteSchool,
  updateSchool,
} from "@/lib/api/schools/mutations";
import {
  SchoolId,
  NewSchoolParams,
  UpdateSchoolParams,
  schoolIdSchema,
  insertSchoolParams,
  updateSchoolParams,
} from "@/lib/db/schema/schools";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSchools = () => revalidatePath("/schools");

export const createSchoolAction = async (input: NewSchoolParams) => {
  try {
    const payload = insertSchoolParams.parse(input);
    await createSchool(payload);
    revalidateSchools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSchoolAction = async (input: UpdateSchoolParams) => {
  try {
    const payload = updateSchoolParams.parse(input);
    await updateSchool(payload.id, payload);
    revalidateSchools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSchoolAction = async (input: SchoolId) => {
  try {
    const payload = schoolIdSchema.parse({ id: input });
    await deleteSchool(payload.id);
    revalidateSchools();
  } catch (e) {
    return handleErrors(e);
  }
};
