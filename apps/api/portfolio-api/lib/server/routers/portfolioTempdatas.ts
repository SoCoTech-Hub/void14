import {
  createPortfolioTempdata,
  deletePortfolioTempdata,
  updatePortfolioTempdata,
} from "../api/portfolioTempdatas/mutations";
import {
  getPortfolioTempdataById,
  getPortfolioTempdatas,
} from "../api/portfolioTempdatas/queries";
import {
  insertPortfolioTempdataParams,
  portfolioTempdataIdSchema,
  updatePortfolioTempdataParams,
} from "../db/schema/portfolioTempdatas";
import { publicProcedure, router } from "../server/trpc";

export const portfolioTempdatasRouter = router({
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
