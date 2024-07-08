import { getPortfolioInstanceUserById, getPortfolioInstanceUsers } from "../api/portfolioInstanceUsers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  portfolioInstanceUserIdSchema,
  insertPortfolioInstanceUserParams,
  updatePortfolioInstanceUserParams,
} from "@soco/portfolio-db/schema/portfolioInstanceUsers";
import { createPortfolioInstanceUser, deletePortfolioInstanceUser, updatePortfolioInstanceUser } from "../api/portfolioInstanceUsers/mutations";

export const portfolioInstanceUsersRouter =createTRPCRouter({
  getPortfolioInstanceUsers: publicProcedure.query(async () => {
    return getPortfolioInstanceUsers();
  }),
  getPortfolioInstanceUserById: publicProcedure.input(portfolioInstanceUserIdSchema).query(async ({ input }) => {
    return getPortfolioInstanceUserById(input.id);
  }),
  createPortfolioInstanceUser: publicProcedure
    .input(insertPortfolioInstanceUserParams)
    .mutation(async ({ input }) => {
      return createPortfolioInstanceUser(input);
    }),
  updatePortfolioInstanceUser: publicProcedure
    .input(updatePortfolioInstanceUserParams)
    .mutation(async ({ input }) => {
      return updatePortfolioInstanceUser(input.id, input);
    }),
  deletePortfolioInstanceUser: publicProcedure
    .input(portfolioInstanceUserIdSchema)
    .mutation(async ({ input }) => {
      return deletePortfolioInstanceUser(input.id);
    }),
});
