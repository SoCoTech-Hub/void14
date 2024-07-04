import {
  createQuestionDdwto,
  deleteQuestionDdwto,
  updateQuestionDdwto,
} from "../api/questionDdwtos/mutations";
import {
  getQuestionDdwtoById,
  getQuestionDdwtos,
} from "../api/questionDdwtos/queries";
import {
  insertQuestionDdwtoParams,
  questionDdwtoIdSchema,
  updateQuestionDdwtoParams,
} from "../db/schema/questionDdwtos";
import { publicProcedure, router } from "../server/trpc";

export const questionDdwtosRouter = router({
  getQuestionDdwtos: publicProcedure.query(async () => {
    return getQuestionDdwtos();
  }),
  getQuestionDdwtoById: publicProcedure
    .input(questionDdwtoIdSchema)
    .query(async ({ input }) => {
      return getQuestionDdwtoById(input.id);
    }),
  createQuestionDdwto: publicProcedure
    .input(insertQuestionDdwtoParams)
    .mutation(async ({ input }) => {
      return createQuestionDdwto(input);
    }),
  updateQuestionDdwto: publicProcedure
    .input(updateQuestionDdwtoParams)
    .mutation(async ({ input }) => {
      return updateQuestionDdwto(input.id, input);
    }),
  deleteQuestionDdwto: publicProcedure
    .input(questionDdwtoIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionDdwto(input.id);
    }),
});
