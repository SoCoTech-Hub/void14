import { db } from "@soco/report-builder-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ReportbuilderAudienceId, reportbuilderAudienceIdSchema, reportbuilderAudiences } from "@soco/report-builder-db/schema/reportbuilderAudiences";

export const getReportbuilderAudiences = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(reportbuilderAudiences).where(eq(reportbuilderAudiences.userId, session?.user.id!));
  const r = rows
  return { reportbuilderAudiences: r };
};

export const getReportbuilderAudienceById = async (id: ReportbuilderAudienceId) => {
  const { session } = await getUserAuth();
  const { id: reportbuilderAudienceId } = reportbuilderAudienceIdSchema.parse({ id });
  const [row] = await db.select().from(reportbuilderAudiences).where(and(eq(reportbuilderAudiences.id, reportbuilderAudienceId), eq(reportbuilderAudiences.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { reportbuilderAudience: r };
};


