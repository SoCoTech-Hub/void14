import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ReportbuilderScheduleId, reportbuilderScheduleIdSchema, reportbuilderSchedules } from "@/lib/db/schema/reportbuilderSchedules";

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


