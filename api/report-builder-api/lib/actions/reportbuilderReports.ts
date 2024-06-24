"use server";

import { revalidatePath } from "next/cache";
import {
  createReportbuilderReport,
  deleteReportbuilderReport,
  updateReportbuilderReport,
} from "@/lib/api/reportbuilderReports/mutations";
import {
  ReportbuilderReportId,
  NewReportbuilderReportParams,
  UpdateReportbuilderReportParams,
  reportbuilderReportIdSchema,
  insertReportbuilderReportParams,
  updateReportbuilderReportParams,
} from "@/lib/db/schema/reportbuilderReports";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateReportbuilderReports = () => revalidatePath("/reportbuilder-reports");

export const createReportbuilderReportAction = async (input: NewReportbuilderReportParams) => {
  try {
    const payload = insertReportbuilderReportParams.parse(input);
    await createReportbuilderReport(payload);
    revalidateReportbuilderReports();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateReportbuilderReportAction = async (input: UpdateReportbuilderReportParams) => {
  try {
    const payload = updateReportbuilderReportParams.parse(input);
    await updateReportbuilderReport(payload.id, payload);
    revalidateReportbuilderReports();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteReportbuilderReportAction = async (input: ReportbuilderReportId) => {
  try {
    const payload = reportbuilderReportIdSchema.parse({ id: input });
    await deleteReportbuilderReport(payload.id);
    revalidateReportbuilderReports();
  } catch (e) {
    return handleErrors(e);
  }
};