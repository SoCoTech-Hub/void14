"use server";

import { revalidatePath } from "next/cache";
import {
  createReportbuilderColumn,
  deleteReportbuilderColumn,
  updateReportbuilderColumn,
} from "@/lib/api/reportbuilderColumns/mutations";
import {
  ReportbuilderColumnId,
  NewReportbuilderColumnParams,
  UpdateReportbuilderColumnParams,
  reportbuilderColumnIdSchema,
  insertReportbuilderColumnParams,
  updateReportbuilderColumnParams,
} from "@/lib/db/schema/reportbuilderColumns";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateReportbuilderColumns = () => revalidatePath("/reportbuilder-columns");

export const createReportbuilderColumnAction = async (input: NewReportbuilderColumnParams) => {
  try {
    const payload = insertReportbuilderColumnParams.parse(input);
    await createReportbuilderColumn(payload);
    revalidateReportbuilderColumns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateReportbuilderColumnAction = async (input: UpdateReportbuilderColumnParams) => {
  try {
    const payload = updateReportbuilderColumnParams.parse(input);
    await updateReportbuilderColumn(payload.id, payload);
    revalidateReportbuilderColumns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteReportbuilderColumnAction = async (input: ReportbuilderColumnId) => {
  try {
    const payload = reportbuilderColumnIdSchema.parse({ id: input });
    await deleteReportbuilderColumn(payload.id);
    revalidateReportbuilderColumns();
  } catch (e) {
    return handleErrors(e);
  }
};