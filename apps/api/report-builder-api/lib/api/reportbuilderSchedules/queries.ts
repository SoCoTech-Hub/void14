import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ReportbuilderScheduleId } from "../db/schema/reportbuilderSchedules";
import { db } from "../db/index";
import {
  reportbuilderScheduleIdSchema,
  reportbuilderSchedules,
} from "../db/schema/reportbuilderSchedules";

export const getReportbuilderSchedules = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(reportbuilderSchedules)
    .where(eq(reportbuilderSchedules.userId, session?.user.id!));
  const r = rows;
  return { reportbuilderSchedules: r };
};

export const getReportbuilderScheduleById = async (
  id: ReportbuilderScheduleId,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(reportbuilderSchedules)
    .where(
      and(
        eq(reportbuilderSchedules.id, reportbuilderScheduleId),
        eq(reportbuilderSchedules.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderSchedule: r };
};
