"use server";

import { revalidatePath } from "next/cache";

import {
  createJobApplicationsApplicationCategory,
  deleteJobApplicationsApplicationCategory,
  updateJobApplicationsApplicationCategory,
} from "../api/jobApplicationsApplicationCategories/mutations";
import {
  insertJobApplicationsApplicationCategoryParams,
  JobApplicationsApplicationCategoryId,
  jobApplicationsApplicationCategoryIdSchema,
  NewJobApplicationsApplicationCategoryParams,
  UpdateJobApplicationsApplicationCategoryParams,
  updateJobApplicationsApplicationCategoryParams,
} from "../db/schema/jobApplicationsApplicationCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateJobApplicationsApplicationCategories = () =>
  revalidatePath("/job-applications-application-categories");

export const createJobApplicationsApplicationCategoryAction = async (
  input: NewJobApplicationsApplicationCategoryParams,
) => {
  try {
    const payload = insertJobApplicationsApplicationCategoryParams.parse(input);
    await createJobApplicationsApplicationCategory(payload);
    revalidateJobApplicationsApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateJobApplicationsApplicationCategoryAction = async (
  input: UpdateJobApplicationsApplicationCategoryParams,
) => {
  try {
    const payload = updateJobApplicationsApplicationCategoryParams.parse(input);
    await updateJobApplicationsApplicationCategory(payload.id, payload);
    revalidateJobApplicationsApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteJobApplicationsApplicationCategoryAction = async (
  input: JobApplicationsApplicationCategoryId,
) => {
  try {
    const payload = jobApplicationsApplicationCategoryIdSchema.parse({
      id: input,
    });
    await deleteJobApplicationsApplicationCategory(payload.id);
    revalidateJobApplicationsApplicationCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
