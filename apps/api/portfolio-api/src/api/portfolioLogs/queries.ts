import { db } from "@soco/portfolio-db/client";
import { eq, and } from "@soco/portfolio-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type PortfolioLogId, portfolioLogIdSchema, portfolioLogs } from "@soco/portfolio-db/schema/portfolioLogs";
import { portfolioInstances } from "@soco/portfolio-db/schema/portfolioInstances";
import { portfolioTempdatas } from "@soco/portfolio-db/schema/portfolioTempdatas";

export const getPortfolioLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ portfolioLog: portfolioLogs, portfolioInstance: portfolioInstances, portfolioTempdata: portfolioTempdatas }).from(portfolioLogs).leftJoin(portfolioInstances, eq(portfolioLogs.portfolioInstanceId, portfolioInstances.id)).leftJoin(portfolioTempdatas, eq(portfolioLogs.portfolioTempdataId, portfolioTempdatas.id)).where(eq(portfolioLogs.userId, session?.user.id!));
  const p = rows .map((r) => ({ ...r.portfolioLog, portfolioInstance: r.portfolioInstance, portfolioTempdata: r.portfolioTempdata})); 
  return { portfolioLogs: p };
};

export const getPortfolioLogById = async (id: PortfolioLogId) => {
  const { session } = await getUserAuth();
  const { id: portfolioLogId } = portfolioLogIdSchema.parse({ id });
  const [row] = await db.select({ portfolioLog: portfolioLogs, portfolioInstance: portfolioInstances, portfolioTempdata: portfolioTempdatas }).from(portfolioLogs).where(and(eq(portfolioLogs.id, portfolioLogId), eq(portfolioLogs.userId, session?.user.id!))).leftJoin(portfolioInstances, eq(portfolioLogs.portfolioInstanceId, portfolioInstances.id)).leftJoin(portfolioTempdatas, eq(portfolioLogs.portfolioTempdataId, portfolioTempdatas.id));
  if (row === undefined) return {};
  const p =  { ...row.portfolioLog, portfolioInstance: row.portfolioInstance, portfolioTempdata: row.portfolioTempdata } ;
  return { portfolioLog: p };
};


