import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertReportbuilderScheduleSchema,
  NewReportbuilderScheduleParams,
  ReportbuilderScheduleId,
  reportbuilderScheduleIdSchema,
  reportbuilderSchedules,
  UpdateReportbuilderScheduleParams,
  updateReportbuilderScheduleSchema,
} from "../../db/schema/reportbuilderSchedules";

export const createReportbuilderSchedule = async (
  reportbuilderSchedule: NewReportbuilderScheduleParams,
) => {
  const { session } = await getUserAuth();
  const newReportbuilderSchedule = insertReportbuilderScheduleSchema.parse({
    ...reportbuilderSchedule,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(reportbuilderSchedules)
      .values(newReportbuilderSchedule)
      .returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderSchedule = async (
  id: ReportbuilderScheduleId,
  reportbuilderSchedule: UpdateReportbuilderScheduleParams,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({
    id,
  });
  const newReportbuilderSchedule = updateReportbuilderScheduleSchema.parse({
    ...reportbuilderSchedule,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(reportbuilderSchedules)
      .set({ ...newReportbuilderSchedule, updatedAt: new Date() })
      .where(
        and(
          eq(reportbuilderSchedules.id, reportbuilderScheduleId!),
          eq(reportbuilderSchedules.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderSchedule = async (
  id: ReportbuilderScheduleId,
) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({
    id,
  });
  try {
    const [r] = await db
      .delete(reportbuilderSchedules)
      .where(
        and(
          eq(reportbuilderSchedules.id, reportbuilderScheduleId!),
          eq(reportbuilderSchedules.userId, session?.user.id!),
        ),
      )
      .returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
