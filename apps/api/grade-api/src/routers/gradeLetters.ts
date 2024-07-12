import {
  gradeLetterIdSchema,
  insertGradeLetterParams,
  updateGradeLetterParams,
} from "@soco/grade-db/schema/gradeLetters";

import {
  createGradeLetter,
  deleteGradeLetter,
  updateGradeLetter,
} from "../api/gradeLetters/mutations";
import {
  getGradeLetterById,
  getGradeLetters,
} from "../api/gradeLetters/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeLettersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradeLetters: publicProcedure.query(async () => {
      return getGradeLetters();
    }),
    getGradeLetterById: publicProcedure
      .input(gradeLetterIdSchema)
      .query(async ({ input }) => {
        return getGradeLetterById(input.id);
      }),
    createGradeLetter: publicProcedure
      .input(insertGradeLetterParams)
      .mutation(async ({ input }) => {
        return createGradeLetter(input);
      }),
    updateGradeLetter: publicProcedure
      .input(updateGradeLetterParams)
      .mutation(async ({ input }) => {
        return updateGradeLetter(input.id, input);
      }),
    deleteGradeLetter: publicProcedure
      .input(gradeLetterIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradeLetter(input.id);
      }),
  });
