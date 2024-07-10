import { db } from "@soco/report-builder-db/client";
import { eq, and } from "@soco/report-builder-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ReportbuilderScheduleId, reportbuilderScheduleIdSchema, reportbuilderSchedules } from "@soco/report-builder-db/schema/reportbuilderSchedules";

export const getReportbuilderSchedules = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(reportbuilderSchedules).where(eq(reportbuilderSchedules.userId, session?.user.id!));
  const r = rows
  return { reportbuilderSchedules: r };
};

export const getReportbuilderScheduleById = async (id: ReportbuilderScheduleId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({ id });
  const [row] = await db.select().from(reportbuilderSchedules).where(and(eq(reportbuilderSchedules.id, reportbuilderScheduleId), eq(reportbuilderSchedules.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderSchedule: r };
};


