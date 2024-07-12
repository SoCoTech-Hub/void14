import {
  insertPortfolioInstanceConfigParams,
  portfolioInstanceConfigIdSchema,
  updatePortfolioInstanceConfigParams,
} from "@soco/portfolio-db/schema/portfolioInstanceConfigs";

import {
  createPortfolioInstanceConfig,
  deletePortfolioInstanceConfig,
  updatePortfolioInstanceConfig,
} from "../api/portfolioInstanceConfigs/mutations";
import {
  getPortfolioInstanceConfigById,
  getPortfolioInstanceConfigs,
} from "../api/portfolioInstanceConfigs/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const portfolioInstanceConfigsRouter = createTRPCRouter({
  getPortfolioInstanceConfigs: publicProcedure.query(async () => {
    return getPortfolioInstanceConfigs();
  }),
  getPortfolioInstanceConfigById: publicProcedure
    .input(portfolioInstanceConfigIdSchema)
    .query(async ({ input }) => {
      return getPortfolioInstanceConfigById(input.id);
    }),
  createPortfolioInstanceConfig: publicProcedure
    .input(insertPortfolioInstanceConfigParams)
    .mutation(async ({ input }) => {
      return createPortfolioInstanceConfig(input);
    }),
  updatePortfolioInstanceConfig: publicProcedure
    .input(updatePortfolioInstanceConfigParams)
    .mutation(async ({ input }) => {
      return updatePortfolioInstanceConfig(input.id, input);
    }),
  deletePortfolioInstanceConfig: publicProcedure
    .input(portfolioInstanceConfigIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioInstanceConfig(input.id);
    }),
});
