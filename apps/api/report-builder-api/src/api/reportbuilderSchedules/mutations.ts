import { db } from "@soco/report-builder-db/index";
import { and, eq } from "drizzle-orm";
import { 
  ReportbuilderScheduleId, 
  NewReportbuilderScheduleParams,
  UpdateReportbuilderScheduleParams, 
  updateReportbuilderScheduleSchema,
  insertReportbuilderScheduleSchema, 
  reportbuilderSchedules,
  reportbuilderScheduleIdSchema 
} from "@soco/report-builder-db/schema/reportbuilderSchedules";
import { getUserAuth } from "@/lib/auth/utils";

export const createReportbuilderSchedule = async (reportbuilderSchedule: NewReportbuilderScheduleParams) => {
  const { session } = await getUserAuth();
  const newReportbuilderSchedule = insertReportbuilderScheduleSchema.parse({ ...reportbuilderSchedule, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(reportbuilderSchedules).values(newReportbuilderSchedule).returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderSchedule = async (id: ReportbuilderScheduleId, reportbuilderSchedule: UpdateReportbuilderScheduleParams) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({ id });
  const newReportbuilderSchedule = updateReportbuilderScheduleSchema.parse({ ...reportbuilderSchedule, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(reportbuilderSchedules)
     .set({...newReportbuilderSchedule, updatedAt: new Date() })
     .where(and(eq(reportbuilderSchedules.id, reportbuilderScheduleId!), eq(reportbuilderSchedules.userId, session?.user.id!)))
     .returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderSchedule = async (id: ReportbuilderScheduleId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderScheduleId } = reportbuilderScheduleIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(reportbuilderSchedules).where(and(eq(reportbuilderSchedules.id, reportbuilderScheduleId!), eq(reportbuilderSchedules.userId, session?.user.id!)))
    .returning();
    return { reportbuilderSchedule: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

