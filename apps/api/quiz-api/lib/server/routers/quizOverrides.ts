import { getQuizOverrideById, getQuizOverrides } from "@/lib/api/quizOverrides/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizOverrideIdSchema,
  insertQuizOverrideParams,
  updateQuizOverrideParams,
} from "@/lib/db/schema/quizOverrides";
import { createQuizOverride, deleteQuizOverride, updateQuizOverride } from "@/lib/api/quizOverrides/mutations";

export const quizOverridesRouter = router({
  getQuizOverrides: publicProcedure.query(async () => {
    return getQuizOverrides();
  }),
  getQuizOverrideById: publicProcedure.input(quizOverrideIdSchema).query(async ({ input }) => {
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
