"use server";

import { revalidatePath } from "next/cache";

import {
  createReportbuilderSchedule,
  deleteReportbuilderSchedule,
  updateReportbuilderSchedule,
} from "../api/reportbuilderSchedules/mutations";
import {
  insertReportbuilderScheduleParams,
  NewReportbuilderScheduleParams,
  ReportbuilderScheduleId,
  reportbuilderScheduleIdSchema,
  UpdateReportbuilderScheduleParams,
  updateReportbuilderScheduleParams,
} from "../db/schema/reportbuilderSchedules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateReportbuilderSchedules = () =>
  revalidatePath("/reportbuilder-schedules");

export const createReportbuilderScheduleAction = async (
  input: NewReportbuilderScheduleParams,
) => {
  try {
    const payload = insertReportbuilderScheduleParams.parse(input);
    await createReportbuilderSchedule(payload);
    revalidateReportbuilderSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateReportbuilderScheduleAction = async (
  input: UpdateReportbuilderScheduleParams,
) => {
  try {
    const payload = updateReportbuilderScheduleParams.parse(input);
    await updateReportbuilderSchedule(payload.id, payload);
    revalidateReportbuilderSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteReportbuilderScheduleAction = async (
  input: ReportbuilderScheduleId,
) => {
  try {
    const payload = reportbuilderScheduleIdSchema.parse({ id: input });
    await deleteReportbuilderSchedule(payload.id);
    revalidateReportbuilderSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};
