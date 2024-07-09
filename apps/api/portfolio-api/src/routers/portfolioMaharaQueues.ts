import { getPortfolioMaharaQueueById, getPortfolioMaharaQueues } from "../api/portfolioMaharaQueues/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  portfolioMaharaQueueIdSchema,
  insertPortfolioMaharaQueueParams,
  updatePortfolioMaharaQueueParams,
} from "@soco/portfolio-db/schema/portfolioMaharaQueues";
import { createPortfolioMaharaQueue, deletePortfolioMaharaQueue, updatePortfolioMaharaQueue } from "../api/portfolioMaharaQueues/mutations";

export const portfolioMaharaQueuesRouter =createTRPCRouter({
  getPortfolioMaharaQueues: publicProcedure.query(async () => {
    return getPortfolioMaharaQueues();
  }),
  getPortfolioMaharaQueueById: publicProcedure.input(portfolioMaharaQueueIdSchema).query(async ({ input }) => {
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