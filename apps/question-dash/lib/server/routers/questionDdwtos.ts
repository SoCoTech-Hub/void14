import { getQuestionDdwtoById, getQuestionDdwtos } from "@/lib/api/questionDdwtos/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionDdwtoIdSchema,
  insertQuestionDdwtoParams,
  updateQuestionDdwtoParams,
} from "@/lib/db/schema/questionDdwtos";
import { createQuestionDdwto, deleteQuestionDdwto, updateQuestionDdwto } from "@/lib/api/questionDdwtos/mutations";

export const questionDdwtosRouter = router({
  getQuestionDdwtos: publicProcedure.query(async () => {
    return getQuestionDdwtos();
  }),
  getQuestionDdwtoById: publicProcedure.input(questionDdwtoIdSchema).query(async ({ input }) => {
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
