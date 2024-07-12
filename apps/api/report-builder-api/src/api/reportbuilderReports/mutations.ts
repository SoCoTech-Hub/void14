import type {
  NewReportbuilderReportParams,
  ReportbuilderReportId,
  UpdateReportbuilderReportParams,
} from "@soco/report-builder-db/schema/reportbuilderReports";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/report-builder-db";
import { db } from "@soco/report-builder-db/client";
import {
  insertReportbuilderReportSchema,
  reportbuilderReportIdSchema,
  reportbuilderReports,
  updateReportbuilderReportSchema,
} from "@soco/report-builder-db/schema/reportbuilderReports";

export const createReportbuilderReport = async (
  reportbuilderReport: NewReportbuilderReportParams,
) => {
  const { session } = await getUserAuth();
  const newReportbuilderReport = insertReportbuilderReportSchema.parse({
    ...reportbuilderReport,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(reportbuilderReports)
      .values(newReportbuilderReport)
      .returning();
    return { reportbuilderReport: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderReport = async (
  id: ReportbuilderReportId,
  reportbuilderReport: UpdateReportbuilderReportParams,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderReportId } = reportbuilderReportIdSchema.parse({
    id,
  });
  const newReportbuilderReport = updateReportbuilderReportSchema.parse({
    ...reportbuilderReport,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(reportbuilderReports)
      .set({ ...newReportbuilderReport, updatedAt: new Date() })
      .where(
        and(
          eq(reportbuilderReports.id, reportbuilderReportId!),
          eq(reportbuilderReports.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderReport: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderReport = async (id: ReportbuilderReportId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderReportId } = reportbuilderReportIdSchema.parse({
    id,
  });
  try {
    const [r] = await db
      .delete(reportbuilderReports)
      .where(
        and(
          eq(reportbuilderReports.id, reportbuilderReportId!),
          eq(reportbuilderReports.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderReport: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
