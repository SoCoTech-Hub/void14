import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PortfolioInstanceConfigId, portfolioInstanceConfigIdSchema, portfolioInstanceConfigs } from "@/lib/db/schema/portfolioInstanceConfigs";
import { portfolioInstances } from "@/lib/db/schema/portfolioInstances";

export const getPortfolioInstanceConfigs = async () => {
  const rows = await db.select({ portfolioInstanceConfig: portfolioInstanceConfigs, portfolioInstance: portfolioInstances }).from(portfolioInstanceConfigs).leftJoin(portfolioInstances, eq(portfolioInstanceConfigs.portfolioInstanceId, portfolioInstances.id));
  const p = rows .map((r) => ({ ...r.portfolioInstanceConfig, portfolioInstance: r.portfolioInstance})); 
  return { portfolioInstanceConfigs: p };
};

export const getPortfolioInstanceConfigById = async (id: PortfolioInstanceConfigId) => {
  const { id: portfolioInstanceConfigId } = portfolioInstanceConfigIdSchema.parse({ id });
  const [row] = await db.select({ portfolioInstanceConfig: portfolioInstanceConfigs, portfolioInstance: portfolioInstances }).from(portfolioInstanceConfigs).where(eq(portfolioInstanceConfigs.id, portfolioInstanceConfigId)).leftJoin(portfolioInstances, eq(portfolioInstanceConfigs.portfolioInstanceId, portfolioInstances.id));
  if (row === undefined) return {};
  const p =  { ...row.portfolioInstanceConfig, portfolioInstance: row.portfolioInstance } ;
  return { portfolioInstanceConfig: p };
};


