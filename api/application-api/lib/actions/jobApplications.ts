"use server";

import { revalidatePath } from "next/cache";
import {
  createJobApplication,
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/api/jobApplications/mutations";
import {
  JobApplicationId,
  NewJobApplicationParams,
  UpdateJobApplicationParams,
  jobApplicationIdSchema,
  insertJobApplicationParams,
  updateJobApplicationParams,
} from "@/lib/db/schema/jobApplications";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateJobApplications = () => revalidatePath("/job-applications");

export const createJobApplicationAction = async (input: NewJobApplicationParams) => {
  try {
    const payload = insertJobApplicationParams.parse(input);
    await createJobApplication(payload);
    revalidateJobApplications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateJobApplicationAction = async (input: UpdateJobApplicationParams) => {
  try {
    const payload = updateJobApplicationParams.parse(input);
    await updateJobApplication(payload.id, payload);
    revalidateJobApplications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteJobApplicationAction = async (input: JobApplicationId) => {
  try {
    const payload = jobApplicationIdSchema.parse({ id: input });
    await deleteJobApplication(payload.id);
    revalidateJobApplications();
  } catch (e) {
    return handleErrors(e);
  }
};