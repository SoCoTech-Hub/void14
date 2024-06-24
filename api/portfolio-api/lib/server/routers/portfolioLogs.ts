import { getPortfolioLogById, getPortfolioLogs } from "@/lib/api/portfolioLogs/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  portfolioLogIdSchema,
  insertPortfolioLogParams,
  updatePortfolioLogParams,
} from "@/lib/db/schema/portfolioLogs";
import { createPortfolioLog, deletePortfolioLog, updatePortfolioLog } from "@/lib/api/portfolioLogs/mutations";

export const portfolioLogsRouter = router({
  getPortfolioLogs: publicProcedure.query(async () => {
    return getPortfolioLogs();
  }),
  getPortfolioLogById: publicProcedure.input(portfolioLogIdSchema).query(async ({ input }) => {
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
