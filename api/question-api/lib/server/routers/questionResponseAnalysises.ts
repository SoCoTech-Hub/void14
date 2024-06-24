import { getQuestionResponseAnalysiseById, getQuestionResponseAnalysises } from "@/lib/api/questionResponseAnalysises/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionResponseAnalysiseIdSchema,
  insertQuestionResponseAnalysiseParams,
  updateQuestionResponseAnalysiseParams,
} from "@/lib/db/schema/questionResponseAnalysises";
import { createQuestionResponseAnalysise, deleteQuestionResponseAnalysise, updateQuestionResponseAnalysise } from "@/lib/api/questionResponseAnalysises/mutations";

export const questionResponseAnalysisesRouter = router({
  getQuestionResponseAnalysises: publicProcedure.query(async () => {
    return getQuestionResponseAnalysises();
  }),
  getQuestionResponseAnalysiseById: publicProcedure.input(questionResponseAnalysiseIdSchema).query(async ({ input }) => {
    return getQuestionResponseAnalysiseById(input.id);
  }),
  createQuestionResponseAnalysise: publicProcedure
    .input(insertQuestionResponseAnalysiseParams)
    .mutation(async ({ input }) => {
      return createQuestionResponseAnalysise(input);
    }),
  updateQuestionResponseAnalysise: publicProcedure
    .input(updateQuestionResponseAnalysiseParams)
    .mutation(async ({ input }) => {
      return updateQuestionResponseAnalysise(input.id, input);
    }),
  deleteQuestionResponseAnalysise: publicProcedure
    .input(questionResponseAnalysiseIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionResponseAnalysise(input.id);
    }),
});
