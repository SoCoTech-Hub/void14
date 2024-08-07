import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ReportbuilderReportId, 
  type NewReportbuilderReportParams,
  type UpdateReportbuilderReportParams, 
  updateReportbuilderReportSchema,
  insertReportbuilderReportSchema, 
  reportbuilderReports,
  reportbuilderReportIdSchema 
} from "@/lib/db/schema/reportbuilderReports";
import { getUserAuth } from "@/lib/auth/utils";

export const createReportbuilderReport = async (reportbuilderReport: NewReportbuilderReportParams) => {
  const { session } = await getUserAuth();
  const newReportbuilderReport = insertReportbuilderReportSchema.parse({ ...reportbuilderReport, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(reportbuilderReports).values(newReportbuilderReport).returning();
    return { reportbuilderReport: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderReport = async (id: ReportbuilderReportId, reportbuilderReport: UpdateReportbuilderReportParams) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderReportId } = reportbuilderReportIdSchema.parse({ id });
  const newReportbuilderReport = updateReportbuilderReportSchema.parse({ ...reportbuilderReport, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(reportbuilderReports)
     .set({...newReportbuilderReport, updatedAt: new Date() })
     .where(and(eq(reportbuilderReports.id, reportbuilderReportId!), eq(reportbuilderReports.userId, session?.user.id!)))
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
  const { id: reportbuilderReportId } = reportbuilderReportIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(reportbuilderReports).where(and(eq(reportbuilderReports.id, reportbuilderReportId!), eq(reportbuilderReports.userId, session?.user.id!)))
    .returning();
    return { reportbuilderReport: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

