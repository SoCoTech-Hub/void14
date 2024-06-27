import { getQuestionGapselectById, getQuestionGapselects } from "@/lib/api/questionGapselects/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionGapselectIdSchema,
  insertQuestionGapselectParams,
  updateQuestionGapselectParams,
} from "@/lib/db/schema/questionGapselects";
import { createQuestionGapselect, deleteQuestionGapselect, updateQuestionGapselect } from "@/lib/api/questionGapselects/mutations";

export const questionGapselectsRouter = router({
  getQuestionGapselects: publicProcedure.query(async () => {
    return getQuestionGapselects();
  }),
  getQuestionGapselectById: publicProcedure.input(questionGapselectIdSchema).query(async ({ input }) => {
    return getQuestionGapselectById(input.id);
  }),
  createQuestionGapselect: publicProcedure
    .input(insertQuestionGapselectParams)
    .mutation(async ({ input }) => {
      return createQuestionGapselect(input);
    }),
  updateQuestionGapselect: publicProcedure
    .input(updateQuestionGapselectParams)
    .mutation(async ({ input }) => {
      return updateQuestionGapselect(input.id, input);
    }),
  deleteQuestionGapselect: publicProcedure
    .input(questionGapselectIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionGapselect(input.id);
    }),
});
