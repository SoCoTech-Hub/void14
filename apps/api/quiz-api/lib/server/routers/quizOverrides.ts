import {
  createQuizOverride,
  deleteQuizOverride,
  updateQuizOverride,
} from "../api/quizOverrides/mutations";
import {
  getQuizOverrideById,
  getQuizOverrides,
} from "../api/quizOverrides/queries";
import {
  insertQuizOverrideParams,
  quizOverrideIdSchema,
  updateQuizOverrideParams,
} from "../db/schema/quizOverrides";
import { publicProcedure, router } from "../server/trpc";

export const quizOverridesRouter = router({
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
