"use server";

import { revalidatePath } from "next/cache";
import {
  createReportbuilderFilter,
  deleteReportbuilderFilter,
  updateReportbuilderFilter,
} from "@/lib/api/reportbuilderFilters/mutations";
import {
  ReportbuilderFilterId,
  NewReportbuilderFilterParams,
  UpdateReportbuilderFilterParams,
  reportbuilderFilterIdSchema,
  insertReportbuilderFilterParams,
  updateReportbuilderFilterParams,
} from "@/lib/db/schema/reportbuilderFilters";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateReportbuilderFilters = () => revalidatePath("/reportbuilder-filters");

export const createReportbuilderFilterAction = async (input: NewReportbuilderFilterParams) => {
  try {
    const payload = insertReportbuilderFilterParams.parse(input);
    await createReportbuilderFilter(payload);
    revalidateReportbuilderFilters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateReportbuilderFilterAction = async (input: UpdateReportbuilderFilterParams) => {
  try {
    const payload = updateReportbuilderFilterParams.parse(input);
    await updateReportbuilderFilter(payload.id, payload);
    revalidateReportbuilderFilters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteReportbuilderFilterAction = async (input: ReportbuilderFilterId) => {
  try {
    const payload = reportbuilderFilterIdSchema.parse({ id: input });
    await deleteReportbuilderFilter(payload.id);
    revalidateReportbuilderFilters();
  } catch (e) {
    return handleErrors(e);
  }
};