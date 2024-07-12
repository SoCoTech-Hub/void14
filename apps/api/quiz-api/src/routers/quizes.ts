import {
  insertQuizeParams,
  quizIdSchema,
  updateQuizeParams,
} from "@soco/quiz-db/schema/quizes";

import { createQuize, deleteQuize, updateQuize } from "../api/quizes/mutations";
import { getQuizeById, getQuizes } from "../api/quizes/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const quizesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getQuizes: publicProcedure.query(async () => {
      return getQuizes();
    }),
    getQuizeById: publicProcedure
      .input(quizIdSchema)
      .query(async ({ input }) => {
        return getQuizeById(input.id);
      }),
    createQuize: publicProcedure
      .input(insertQuizeParams)
      .mutation(async ({ input }) => {
        return createQuize(input);
      }),
    updateQuize: publicProcedure
      .input(updateQuizeParams)
      .mutation(async ({ input }) => {
        return updateQuize(input.id, input);
      }),
    deleteQuize: publicProcedure
      .input(quizIdSchema)
      .mutation(async ({ input }) => {
        return deleteQuize(input.id);
      }),
  });
