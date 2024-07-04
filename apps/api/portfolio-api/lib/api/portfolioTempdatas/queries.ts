import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type PortfolioTempdataId, portfolioTempdataIdSchema, portfolioTempdatas } from "@/lib/db/schema/portfolioTempdatas";
import { portfolioInstances } from "@/lib/db/schema/portfolioInstances";

export const getPortfolioTempdatas = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ portfolioTempdata: portfolioTempdatas, portfolioInstance: portfolioInstances }).from(portfolioTempdatas).leftJoin(portfolioInstances, eq(portfolioTempdatas.portfolioInstanceId, portfolioInstances.id)).where(eq(portfolioTempdatas.userId, session?.user.id!));
  const p = rows .map((r) => ({ ...r.portfolioTempdata, portfolioInstance: r.portfolioInstance})); 
  return { portfolioTempdatas: p };
};

export const getPortfolioTempdataById = async (id: PortfolioTempdataId) => {
  const { session } = await getUserAuth();
  const { id: portfolioTempdataId } = portfolioTempdataIdSchema.parse({ id });
  const [row] = await db.select({ portfolioTempdata: portfolioTempdatas, portfolioInstance: portfolioInstances }).from(portfolioTempdatas).where(and(eq(portfolioTempdatas.id, portfolioTempdataId), eq(portfolioTempdatas.userId, session?.user.id!))).leftJoin(portfolioInstances, eq(portfolioTempdatas.portfolioInstanceId, portfolioInstances.id));
  if (row === undefined) return {};
  const p =  { ...row.portfolioTempdata, portfolioInstance: row.portfolioInstance } ;
  return { portfolioTempdata: p };
};


