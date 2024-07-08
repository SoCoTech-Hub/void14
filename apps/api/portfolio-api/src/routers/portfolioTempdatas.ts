import { getPortfolioTempdataById, getPortfolioTempdatas } from "../api/portfolioTempdatas/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  portfolioTempdataIdSchema,
  insertPortfolioTempdataParams,
  updatePortfolioTempdataParams,
} from "@soco/portfolio-db/schema/portfolioTempdatas";
import { createPortfolioTempdata, deletePortfolioTempdata, updatePortfolioTempdata } from "../api/portfolioTempdatas/mutations";

export const portfolioTempdatasRouter =createTRPCRouter({
  getPortfolioTempdatas: publicProcedure.query(async () => {
    return getPortfolioTempdatas();
  }),
  getPortfolioTempdataById: publicProcedure.input(portfolioTempdataIdSchema).query(async ({ input }) => {
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
