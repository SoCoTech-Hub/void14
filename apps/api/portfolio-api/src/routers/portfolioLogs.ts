import {
  insertPortfolioLogParams,
  portfolioLogIdSchema,
  updatePortfolioLogParams,
} from "@soco/portfolio-db/schema/portfolioLogs";

import {
  createPortfolioLog,
  deletePortfolioLog,
  updatePortfolioLog,
} from "../api/portfolioLogs/mutations";
import {
  getPortfolioLogById,
  getPortfolioLogs,
} from "../api/portfolioLogs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const portfolioLogsRouter = createTRPCRouter({
  getPortfolioLogs: publicProcedure.query(async () => {
    return getPortfolioLogs();
  }),
  getPortfolioLogById: publicProcedure
    .input(portfolioLogIdSchema)
    .query(async ({ input }) => {
      return getPortfolioLogById(input.id);
    }),
  createPortfolioLog: publicProcedure
    .input(insertPortfolioLogParams)
    .mutation(async ({ input }) => {
      return createPortfolioLog(input);
    }),
  updatePortfolioLog: publicProcedure
    .input(updatePortfolioLogParams)
    .mutation(async ({ input }) => {
      return updatePortfolioLog(input.id, input);
    }),
  deletePortfolioLog: publicProcedure
    .input(portfolioLogIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioLog(input.id);
    }),
});
