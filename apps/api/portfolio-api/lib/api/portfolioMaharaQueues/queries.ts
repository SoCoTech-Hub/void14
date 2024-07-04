import { eq } from "drizzle-orm";

import type { PortfolioMaharaQueueId } from "../db/schema/portfolioMaharaQueues";
import { db } from "../db/index";
import {
  portfolioMaharaQueueIdSchema,
  portfolioMaharaQueues,
} from "../db/schema/portfolioMaharaQueues";
import { portfolioTempdatas } from "../db/schema/portfolioTempdatas";

export const getPortfolioMaharaQueues = async () => {
  const rows = await db
    .select({
      portfolioMaharaQueue: portfolioMaharaQueues,
      portfolioTempdata: portfolioTempdatas,
    })
    .from(portfolioMaharaQueues)
    .leftJoin(
      portfolioTempdatas,
      eq(portfolioMaharaQueues.portfolioTempdataId, portfolioTempdatas.id),
    );
  const p = rows.map((r) => ({
    ...r.portfolioMaharaQueue,
    portfolioTempdata: r.portfolioTempdata,
  }));
  return { portfolioMaharaQueues: p };
};

export const getPortfolioMaharaQueueById = async (
  id: PortfolioMaharaQueueId,
) => {
  const { id: portfolioMaharaQueueId } = portfolioMaharaQueueIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      portfolioMaharaQueue: portfolioMaharaQueues,
      portfolioTempdata: portfolioTempdatas,
    })
    .from(portfolioMaharaQueues)
    .where(eq(portfolioMaharaQueues.id, portfolioMaharaQueueId))
    .leftJoin(
      portfolioTempdatas,
      eq(portfolioMaharaQueues.portfolioTempdataId, portfolioTempdatas.id),
    );
  if (row === undefined) return {};
  const p = {
    ...row.portfolioMaharaQueue,
    portfolioTempdata: row.portfolioTempdata,
  };
  return { portfolioMaharaQueue: p };
};
