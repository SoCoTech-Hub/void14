"use server";

import { revalidatePath } from "next/cache";

import {
  createAnalyticsUsedFile,
  deleteAnalyticsUsedFile,
  updateAnalyticsUsedFile,
} from "../api/analyticsUsedFiles/mutations";
import {
  AnalyticsUsedFileId,
  analyticsUsedFileIdSchema,
  insertAnalyticsUsedFileParams,
  NewAnalyticsUsedFileParams,
  UpdateAnalyticsUsedFileParams,
  updateAnalyticsUsedFileParams,
} from "../db/schema/analyticsUsedFiles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAnalyticsUsedFiles = () =>
  revalidatePath("/analytics-used-files");

export const createAnalyticsUsedFileAction = async (
  input: NewAnalyticsUsedFileParams,
) => {
  try {
    const payload = insertAnalyticsUsedFileParams.parse(input);
    await createAnalyticsUsedFile(payload);
    revalidateAnalyticsUsedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAnalyticsUsedFileAction = async (
  input: UpdateAnalyticsUsedFileParams,
) => {
  try {
    const payload = updateAnalyticsUsedFileParams.parse(input);
    await updateAnalyticsUsedFile(payload.id, payload);
    revalidateAnalyticsUsedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAnalyticsUsedFileAction = async (
  input: AnalyticsUsedFileId,
) => {
  try {
    const payload = analyticsUsedFileIdSchema.parse({ id: input });
    await deleteAnalyticsUsedFile(payload.id);
    revalidateAnalyticsUsedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};
