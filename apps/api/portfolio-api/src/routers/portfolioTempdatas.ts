import {
  insertPortfolioTempdataParams,
  portfolioTempdataIdSchema,
  updatePortfolioTempdataParams,
} from "@soco/portfolio-db/schema/portfolioTempdatas";

import {
  createPortfolioTempdata,
  deletePortfolioTempdata,
  updatePortfolioTempdata,
} from "../api/portfolioTempdatas/mutations";
import {
  getPortfolioTempdataById,
  getPortfolioTempdatas,
} from "../api/portfolioTempdatas/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const portfolioTempdatasRouter = createTRPCRouter({
  getPortfolioTempdatas: publicProcedure.query(async () => {
    return getPortfolioTempdatas();
  }),
  getPortfolioTempdataById: publicProcedure
    .input(portfolioTempdataIdSchema)
    .query(async ({ input }) => {
      return getPortfolioTempdataById(input.id);
    }),
  createPortfolioTempdata: publicProcedure
    .input(insertPortfolioTempdataParams)
    .mutation(async ({ input }) => {
      return createPortfolioTempdata(input);
    }),
  updatePortfolioTempdata: publicProcedure
    .input(updatePortfolioTempdataParams)
    .mutation(async ({ input }) => {
      return updatePortfolioTempdata(input.id, input);
    }),
  deletePortfolioTempdata: publicProcedure
    .input(portfolioTempdataIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioTempdata(input.id);
    }),
});
