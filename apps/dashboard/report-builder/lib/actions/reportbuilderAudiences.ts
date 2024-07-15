"use server";

import { revalidatePath } from "next/cache";
import {
  createReportbuilderAudience,
  deleteReportbuilderAudience,
  updateReportbuilderAudience,
} from "@/lib/api/reportbuilderAudiences/mutations";
import {
  ReportbuilderAudienceId,
  NewReportbuilderAudienceParams,
  UpdateReportbuilderAudienceParams,
  reportbuilderAudienceIdSchema,
  insertReportbuilderAudienceParams,
  updateReportbuilderAudienceParams,
} from "@/lib/db/schema/reportbuilderAudiences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateReportbuilderAudiences = () => revalidatePath("/reportbuilder-audiences");

export const createReportbuilderAudienceAction = async (input: NewReportbuilderAudienceParams) => {
  try {
    const payload = insertReportbuilderAudienceParams.parse(input);
    await createReportbuilderAudience(payload);
    revalidateReportbuilderAudiences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateReportbuilderAudienceAction = async (input: UpdateReportbuilderAudienceParams) => {
  try {
    const payload = updateReportbuilderAudienceParams.parse(input);
    await updateReportbuilderAudience(payload.id, payload);
    revalidateReportbuilderAudiences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteReportbuilderAudienceAction = async (input: ReportbuilderAudienceId) => {
  try {
    const payload = reportbuilderAudienceIdSchema.parse({ id: input });
    await deleteReportbuilderAudience(payload.id);
    revalidateReportbuilderAudiences();
  } catch (e) {
    return handleErrors(e);
  }
};
