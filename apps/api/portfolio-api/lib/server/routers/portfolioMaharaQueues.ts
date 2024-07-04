import {
  createPortfolioMaharaQueue,
  deletePortfolioMaharaQueue,
  updatePortfolioMaharaQueue,
} from "../api/portfolioMaharaQueues/mutations";
import {
  getPortfolioMaharaQueueById,
  getPortfolioMaharaQueues,
} from "../api/portfolioMaharaQueues/queries";
import {
  insertPortfolioMaharaQueueParams,
  portfolioMaharaQueueIdSchema,
  updatePortfolioMaharaQueueParams,
} from "../db/schema/portfolioMaharaQueues";
import { publicProcedure, router } from "../server/trpc";

export const portfolioMaharaQueuesRouter = router({
  getPortfolioMaharaQueues: publicProcedure.query(async () => {
    return getPortfolioMaharaQueues();
  }),
  getPortfolioMaharaQueueById: publicProcedure
    .input(portfolioMaharaQueueIdSchema)
    .query(async ({ input }) => {
      return getPortfolioMaharaQueueById(input.id);
    }),
  createPortfolioMaharaQueue: publicProcedure
    .input(insertPortfolioMaharaQueueParams)
    .mutation(async ({ input }) => {
      return createPortfolioMaharaQueue(input);
    }),
  updatePortfolioMaharaQueue: publicProcedure
    .input(updatePortfolioMaharaQueueParams)
    .mutation(async ({ input }) => {
      return updatePortfolioMaharaQueue(input.id, input);
    }),
  deletePortfolioMaharaQueue: publicProcedure
    .input(portfolioMaharaQueueIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioMaharaQueue(input.id);
    }),
});
