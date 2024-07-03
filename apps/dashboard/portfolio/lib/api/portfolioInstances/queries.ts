import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type PortfolioInstanceId, portfolioInstanceIdSchema, portfolioInstances } from "@/lib/db/schema/portfolioInstances";

export const getPortfolioInstances = async () => {
  const rows = await db.select().from(portfolioInstances);
  const p = rows
  return { portfolioInstances: p };
};

export const getPortfolioInstanceById = async (id: PortfolioInstanceId) => {
  const { id: portfolioInstanceId } = portfolioInstanceIdSchema.parse({ id });
  const [row] = await db.select().from(portfolioInstances).where(eq(portfolioInstances.id, portfolioInstanceId));
  if (row === undefined) return {};
  const p = row;
  return { portfolioInstance: p };
};


