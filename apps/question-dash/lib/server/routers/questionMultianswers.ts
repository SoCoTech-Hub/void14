import { getQuestionMultianswerById, getQuestionMultianswers } from "@/lib/api/questionMultianswers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  questionMultianswerIdSchema,
  insertQuestionMultianswerParams,
  updateQuestionMultianswerParams,
} from "@/lib/db/schema/questionMultianswers";
import { createQuestionMultianswer, deleteQuestionMultianswer, updateQuestionMultianswer } from "@/lib/api/questionMultianswers/mutations";

export const questionMultianswersRouter = router({
  getQuestionMultianswers: publicProcedure.query(async () => {
    return getQuestionMultianswers();
  }),
  getQuestionMultianswerById: publicProcedure.input(questionMultianswerIdSchema).query(async ({ input }) => {
    return getQuestionMultianswerById(input.id);
  }),
  createQuestionMultianswer: publicProcedure
    .input(insertQuestionMultianswerParams)
    .mutation(async ({ input }) => {
      return createQuestionMultianswer(input);
    }),
  updateQuestionMultianswer: publicProcedure
    .input(updateQuestionMultianswerParams)
    .mutation(async ({ input }) => {
      return updateQuestionMultianswer(input.id, input);
    }),
  deleteQuestionMultianswer: publicProcedure
    .input(questionMultianswerIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuestionMultianswer(input.id);
    }),
});
