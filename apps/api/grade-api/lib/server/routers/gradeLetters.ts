import {
  createGradeLetter,
  deleteGradeLetter,
  updateGradeLetter,
} from "../api/gradeLetters/mutations";
import {
  getGradeLetterById,
  getGradeLetters,
} from "../api/gradeLetters/queries";
import {
  gradeLetterIdSchema,
  insertGradeLetterParams,
  updateGradeLetterParams,
} from "../db/schema/gradeLetters";
import { publicProcedure, router } from "../server/trpc";

export const gradeLettersRouter = router({
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