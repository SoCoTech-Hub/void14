import {
  insertQuizOverrideParams,
  quizOverrideIdSchema,
  updateQuizOverrideParams,
} from "@soco/quiz-db/schema/quizOverrides";

import {
  createQuizOverride,
  deleteQuizOverride,
  updateQuizOverride,
} from "../api/quizOverrides/mutations";
import {
  getQuizOverrideById,
  getQuizOverrides,
} from "../api/quizOverrides/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizOverridesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuizOverrides: publicProcedure.query(async () => {
      return getQuizOverrides();
    }),
    getQuizOverrideById: publicProcedure
      .input(quizOverrideIdSchema)
      .query(async ({ input }) => {
        return getQuizOverrideById(input.id);
      }),
    createQuizOverride: publicProcedure
      .input(insertQuizOverrideParams)
      .mutation(async ({ input }) => {
        return createQuizOverride(input);
      }),
    updateQuizOverride: publicProcedure
      .input(updateQuizOverrideParams)
      .mutation(async ({ input }) => {
        return updateQuizOverride(input.id, input);
      }),
    deleteQuizOverride: publicProcedure
      .input(quizOverrideIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuizOverride(input.id);
      }),
  });
