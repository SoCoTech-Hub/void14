import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ReportbuilderReportId, reportbuilderReportIdSchema, reportbuilderReports } from "@/lib/db/schema/reportbuilderReports";

export const getReportbuilderReports = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(reportbuilderReports).where(eq(reportbuilderReports.userId, session?.user.id!));
  const r = rows
  return { reportbuilderReports: r };
};

export const getReportbuilderReportById = async (id: ReportbuilderReportId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderReportId } = reportbuilderReportIdSchema.parse({ id });
  const [row] = await db.select().from(reportbuilderReports).where(and(eq(reportbuilderReports.id, reportbuilderReportId), eq(reportbuilderReports.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderReport: r };
};


