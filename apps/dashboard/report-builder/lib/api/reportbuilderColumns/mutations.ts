import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ReportbuilderColumnId, 
  type NewReportbuilderColumnParams,
  type UpdateReportbuilderColumnParams, 
  updateReportbuilderColumnSchema,
  insertReportbuilderColumnSchema, 
  reportbuilderColumns,
  reportbuilderColumnIdSchema 
} from "@/lib/db/schema/reportbuilderColumns";
import { getUserAuth } from "@/lib/auth/utils";

export const createReportbuilderColumn = async (reportbuilderColumn: NewReportbuilderColumnParams) => {
  const { session } = await getUserAuth();
  const newReportbuilderColumn = insertReportbuilderColumnSchema.parse({ ...reportbuilderColumn, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(reportbuilderColumns).values(newReportbuilderColumn).returning();
    return { reportbuilderColumn: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateReportbuilderColumn = async (id: ReportbuilderColumnId, reportbuilderColumn: UpdateReportbuilderColumnParams) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderColumnId } = reportbuilderColumnIdSchema.parse({ id });
  const newReportbuilderColumn = updateReportbuilderColumnSchema.parse({ ...reportbuilderColumn, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(reportbuilderColumns)
     .set({...newReportbuilderColumn, updatedAt: new Date() })
     .where(and(eq(reportbuilderColumns.id, reportbuilderColumnId!), eq(reportbuilderColumns.userId, session?.user.id!)))
     .returning();
    return { reportbuilderColumn: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteReportbuilderColumn = async (id: ReportbuilderColumnId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderColumnId } = reportbuilderColumnIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(reportbuilderColumns).where(and(eq(reportbuilderColumns.id, reportbuilderColumnId!), eq(reportbuilderColumns.userId, session?.user.id!)))
    .returning();
    return { reportbuilderColumn: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

