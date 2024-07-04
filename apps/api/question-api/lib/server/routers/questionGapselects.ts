import {
  createQuestionGapselect,
  deleteQuestionGapselect,
  updateQuestionGapselect,
} from "../api/questionGapselects/mutations";
import {
  getQuestionGapselectById,
  getQuestionGapselects,
} from "../api/questionGapselects/queries";
import {
  insertQuestionGapselectParams,
  questionGapselectIdSchema,
  updateQuestionGapselectParams,
} from "../db/schema/questionGapselects";
import { publicProcedure, router } from "../server/trpc";

export const questionGapselectsRouter = router({
  getQuestionGapselects: publicProcedure.query(async () => {
    return getQuestionGapselects();
  }),
  getQuestionGapselectById: publicProcedure
    .input(questionGapselectIdSchema)
    .query(async ({ input }) => {
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
