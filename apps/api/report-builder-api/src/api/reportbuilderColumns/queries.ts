import { db } from "@soco/report-builder-db/client";
import { eq, and } from "@soco/report-builder-db";
import { getUserAuth } from "@soco/auth-service";
import { type ReportbuilderColumnId, reportbuilderColumnIdSchema, reportbuilderColumns } from "@soco/report-builder-db/schema/reportbuilderColumns";

export const getReportbuilderColumns = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(reportbuilderColumns).where(eq(reportbuilderColumns.userId, session?.user.id!));
  const r = rows
  return { reportbuilderColumns: r };
};

export const getReportbuilderColumnById = async (id: ReportbuilderColumnId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderColumnId } = reportbuilderColumnIdSchema.parse({ id });
  const [row] = await db.select().from(reportbuilderColumns).where(and(eq(reportbuilderColumns.id, reportbuilderColumnId), eq(reportbuilderColumns.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderColumn: r };
};


