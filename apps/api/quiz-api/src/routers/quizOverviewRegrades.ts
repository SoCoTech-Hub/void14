import {
  insertQuizOverviewRegradeParams,
  quizOverviewRegradeIdSchema,
  updateQuizOverviewRegradeParams,
} from "@soco/quiz-db/schema/quizOverviewRegrades";

import {
  createQuizOverviewRegrade,
  deleteQuizOverviewRegrade,
  updateQuizOverviewRegrade,
} from "../api/quizOverviewRegrades/mutations";
import {
  getQuizOverviewRegradeById,
  getQuizOverviewRegrades,
} from "../api/quizOverviewRegrades/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizOverviewRegradesRouter = createTRPCRouter({
  getQuizOverviewRegrades: publicProcedure.query(async () => {
    return getQuizOverviewRegrades();
  }),
  getQuizOverviewRegradeById: publicProcedure
    .input(quizOverviewRegradeIdSchema)
    .query(async ({ input }) => {
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
