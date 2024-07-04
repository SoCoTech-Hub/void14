import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertPortfolioMaharaQueueSchema,
  NewPortfolioMaharaQueueParams,
  PortfolioMaharaQueueId,
  portfolioMaharaQueueIdSchema,
  portfolioMaharaQueues,
  UpdatePortfolioMaharaQueueParams,
  updatePortfolioMaharaQueueSchema,
} from "../db/schema/portfolioMaharaQueues";

export const createPortfolioMaharaQueue = async (
  portfolioMaharaQueue: NewPortfolioMaharaQueueParams,
) => {
  const newPortfolioMaharaQueue =
    insertPortfolioMaharaQueueSchema.parse(portfolioMaharaQueue);
  try {
    const [p] = await db
      .insert(portfolioMaharaQueues)
      .values(newPortfolioMaharaQueue)
      .returning();
    return { portfolioMaharaQueue: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePortfolioMaharaQueue = async (
  id: PortfolioMaharaQueueId,
  portfolioMaharaQueue: UpdatePortfolioMaharaQueueParams,
) => {
  const { id: portfolioMaharaQueueId } = portfolioMaharaQueueIdSchema.parse({
    id,
  });
  const newPortfolioMaharaQueue =
    updatePortfolioMaharaQueueSchema.parse(portfolioMaharaQueue);
  try {
    const [p] = await db
      .update(portfolioMaharaQueues)
      .set(newPortfolioMaharaQueue)
      .where(eq(portfolioMaharaQueues.id, portfolioMaharaQueueId!))
      .returning();
    return { portfolioMaharaQueue: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePortfolioMaharaQueue = async (
  id: PortfolioMaharaQueueId,
) => {
  const { id: portfolioMaharaQueueId } = portfolioMaharaQueueIdSchema.parse({
    id,
  });
  try {
    const [p] = await db
      .delete(portfolioMaharaQueues)
      .where(eq(portfolioMaharaQueues.id, portfolioMaharaQueueId!))
      .returning();
    return { portfolioMaharaQueue: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
