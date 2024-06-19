import { getQuestionHintById, getQuestionHints } from "@/lib/api/questionHints/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionHintIdSchema,
  insertQuestionHintParams,
  updateQuestionHintParams,
} from "@/lib/db/schema/questionHints";
import { createQuestionHint, deleteQuestionHint, updateQuestionHint } from "@/lib/api/questionHints/mutations";

export const questionHintsRouter = router({
  getQuestionHints: publicProcedure.query(async () => {
    return getQuestionHints();
  }),
  getQuestionHintById: publicProcedure.input(questionHintIdSchema).query(async ({ input }) => {
    return getQuestionHintById(input.id);
  }),
  createQuestionHint: publicProcedure
    .input(insertQuestionHintParams)
    .mutation(async ({ input }) => {
      return createQuestionHint(input);
    }),
  updateQuestionHint: publicProcedure
    .input(updateQuestionHintParams)
    .mutation(async ({ input }) => {
      return updateQuestionHint(input.id, input);
    }),
  deleteQuestionHint: publicProcedure
    .input(questionHintIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionHint(input.id);
    }),
});
