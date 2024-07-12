import {
  insertQuestionMultianswerParams,
  questionMultianswerIdSchema,
  updateQuestionMultianswerParams,
} from "@soco/question-db/schema/questionMultianswers";

import {
  createQuestionMultianswer,
  deleteQuestionMultianswer,
  updateQuestionMultianswer,
} from "../api/questionMultianswers/mutations";
import {
  getQuestionMultianswerById,
  getQuestionMultianswers,
} from "../api/questionMultianswers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionMultianswersRouter = createTRPCRouter({
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
