import {
  insertPortfolioInstanceParams,
  portfolioInstanceIdSchema,
  updatePortfolioInstanceParams,
} from "@soco/portfolio-db/schema/portfolioInstances";

import {
  createPortfolioInstance,
  deletePortfolioInstance,
  updatePortfolioInstance,
} from "../api/portfolioInstances/mutations";
import {
  getPortfolioInstanceById,
  getPortfolioInstances,
} from "../api/portfolioInstances/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const portfolioInstancesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getPortfolioInstances: publicProcedure.query(async () => {
      return getPortfolioInstances();
    }),
    getPortfolioInstanceById: publicProcedure
      .input(portfolioInstanceIdSchema)
      .query(async ({ input }) => {
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
