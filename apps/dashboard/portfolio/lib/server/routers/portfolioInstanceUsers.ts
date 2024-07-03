import { getPortfolioInstanceUserById, getPortfolioInstanceUsers } from "@/lib/api/portfolioInstanceUsers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  portfolioInstanceUserIdSchema,
  insertPortfolioInstanceUserParams,
  updatePortfolioInstanceUserParams,
} from "@/lib/db/schema/portfolioInstanceUsers";
import { createPortfolioInstanceUser, deletePortfolioInstanceUser, updatePortfolioInstanceUser } from "@/lib/api/portfolioInstanceUsers/mutations";

export const portfolioInstanceUsersRouter = router({
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
