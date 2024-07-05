import { eq } from "drizzle-orm";

import type { PortfolioInstanceId } from "../../db/schema/portfolioInstances";
import { db } from "../../db/index";
import {
  portfolioInstanceIdSchema,
  portfolioInstances,
} from "../../db/schema/portfolioInstances";

export const getPortfolioInstances = async () => {
  const rows = await db.select().from(portfolioInstances);
  const p = rows;
  return { portfolioInstances: p };
};

export const getPortfolioInstanceById = async (id: PortfolioInstanceId) => {
  const { id: portfolioInstanceId } = portfolioInstanceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(portfolioInstances)
    .where(eq(portfolioInstances.id, portfolioInstanceId));
  if (row === undefined) return {};
  const p = row;
  return { portfolioInstance: p };
};
