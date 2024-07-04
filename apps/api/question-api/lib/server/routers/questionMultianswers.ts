import {
  createQuestionMultianswer,
  deleteQuestionMultianswer,
  updateQuestionMultianswer,
} from "../api/questionMultianswers/mutations";
import {
  getQuestionMultianswerById,
  getQuestionMultianswers,
} from "../api/questionMultianswers/queries";
import {
  insertQuestionMultianswerParams,
  questionMultianswerIdSchema,
  updateQuestionMultianswerParams,
} from "../db/schema/questionMultianswers";
import { publicProcedure, router } from "../server/trpc";

export const questionMultianswersRouter = router({
  getQuestionMultianswers: publicProcedure.query(async () => {
    return getQuestionMultianswers();
  }),
  getQuestionMultianswerById: publicProcedure
    .input(questionMultianswerIdSchema)
    .query(async ({ input }) => {
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
