import {
  insertQuestionCalculatedParams,
  questionCalculatedIdSchema,
  updateQuestionCalculatedParams,
} from "@soco/question-db/schema/questionCalculateds";

import {
  createQuestionCalculated,
  deleteQuestionCalculated,
  updateQuestionCalculated,
} from "../api/questionCalculateds/mutations";
import {
  getQuestionCalculatedById,
  getQuestionCalculateds,
} from "../api/questionCalculateds/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const questionCalculatedsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuestionCalculateds: publicProcedure.query(async () => {
      return getQuestionCalculateds();
    }),
    getQuestionCalculatedById: publicProcedure
      .input(questionCalculatedIdSchema)
      .query(async ({ input }) => {
        return getQuestionCalculatedById(input.id);
      }),
    createQuestionCalculated: publicProcedure
      .input(insertQuestionCalculatedParams)
      .mutation(async ({ input }) => {
        return createQuestionCalculated(input);
      }),
    updateQuestionCalculated: publicProcedure
      .input(updateQuestionCalculatedParams)
      .mutation(async ({ input }) => {
        return updateQuestionCalculated(input.id, input);
      }),
    deleteQuestionCalculated: publicProcedure
      .input(questionCalculatedIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuestionCalculated(input.id);
      }),
  });
