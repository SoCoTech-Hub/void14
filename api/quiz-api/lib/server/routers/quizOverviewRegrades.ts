import { getQuizOverviewRegradeById, getQuizOverviewRegrades } from "@/lib/api/quizOverviewRegrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizOverviewRegradeIdSchema,
  insertQuizOverviewRegradeParams,
  updateQuizOverviewRegradeParams,
} from "@/lib/db/schema/quizOverviewRegrades";
import { createQuizOverviewRegrade, deleteQuizOverviewRegrade, updateQuizOverviewRegrade } from "@/lib/api/quizOverviewRegrades/mutations";

export const quizOverviewRegradesRouter = router({
  getQuizOverviewRegrades: publicProcedure.query(async () => {
    return getQuizOverviewRegrades();
  }),
  getQuizOverviewRegradeById: publicProcedure.input(quizOverviewRegradeIdSchema).query(async ({ input }) => {
    return getQuizOverviewRegradeById(input.id);
  }),
  createQuizOverviewRegrade: publicProcedure
    .input(insertQuizOverviewRegradeParams)
    .mutation(async ({ input }) => {
      return createQuizOverviewRegrade(input);
    }),
  updateQuizOverviewRegrade: publicProcedure
    .input(updateQuizOverviewRegradeParams)
    .mutation(async ({ input }) => {
      return updateQuizOverviewRegrade(input.id, input);
    }),
  deleteQuizOverviewRegrade: publicProcedure
    .input(quizOverviewRegradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizOverviewRegrade(input.id);
    }),
});
