import type { PortfolioMaharaQueueId } from "@soco/portfolio-db/schema/portfolioMaharaQueues";
import { eq } from "@soco/portfolio-db";
import { db } from "@soco/portfolio-db/client";
import {
  portfolioMaharaQueueIdSchema,
  portfolioMaharaQueues,
} from "@soco/portfolio-db/schema/portfolioMaharaQueues";
import { portfolioTempdatas } from "@soco/portfolio-db/schema/portfolioTempdatas";

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
