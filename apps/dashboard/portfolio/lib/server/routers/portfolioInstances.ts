import { getPortfolioInstanceById, getPortfolioInstances } from "@/lib/api/portfolioInstances/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  portfolioInstanceIdSchema,
  insertPortfolioInstanceParams,
  updatePortfolioInstanceParams,
} from "@/lib/db/schema/portfolioInstances";
import { createPortfolioInstance, deletePortfolioInstance, updatePortfolioInstance } from "@/lib/api/portfolioInstances/mutations";

export const portfolioInstancesRouter = router({
  getPortfolioInstances: publicProcedure.query(async () => {
    return getPortfolioInstances();
  }),
  getPortfolioInstanceById: publicProcedure.input(portfolioInstanceIdSchema).query(async ({ input }) => {
    return getPortfolioInstanceById(input.id);
  }),
  createPortfolioInstance: publicProcedure
    .input(insertPortfolioInstanceParams)
    .mutation(async ({ input }) => {
      return createPortfolioInstance(input);
    }),
  updatePortfolioInstance: publicProcedure
    .input(updatePortfolioInstanceParams)
    .mutation(async ({ input }) => {
      return updatePortfolioInstance(input.id, input);
    }),
  deletePortfolioInstance: publicProcedure
    .input(portfolioInstanceIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioInstance(input.id);
    }),
});
