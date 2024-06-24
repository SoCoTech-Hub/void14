import { getPortfolioTempdataById, getPortfolioTempdatas } from "@/lib/api/portfolioTempdatas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  portfolioTempdataIdSchema,
  insertPortfolioTempdataParams,
  updatePortfolioTempdataParams,
} from "@/lib/db/schema/portfolioTempdatas";
import { createPortfolioTempdata, deletePortfolioTempdata, updatePortfolioTempdata } from "@/lib/api/portfolioTempdatas/mutations";

export const portfolioTempdatasRouter = router({
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
