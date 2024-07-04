import {
  createPortfolioInstanceUser,
  deletePortfolioInstanceUser,
  updatePortfolioInstanceUser,
} from "../api/portfolioInstanceUsers/mutations";
import {
  getPortfolioInstanceUserById,
  getPortfolioInstanceUsers,
} from "../api/portfolioInstanceUsers/queries";
import {
  insertPortfolioInstanceUserParams,
  portfolioInstanceUserIdSchema,
  updatePortfolioInstanceUserParams,
} from "../db/schema/portfolioInstanceUsers";
import { publicProcedure, router } from "../server/trpc";

export const portfolioInstanceUsersRouter = router({
  getPortfolioInstanceUsers: publicProcedure.query(async () => {
    return getPortfolioInstanceUsers();
  }),
  getPortfolioInstanceUserById: publicProcedure
    .input(portfolioInstanceUserIdSchema)
    .query(async ({ input }) => {
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
