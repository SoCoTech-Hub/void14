import { getGradeLetterById, getGradeLetters } from "@/lib/api/gradeLetters/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeLetterIdSchema,
  insertGradeLetterParams,
  updateGradeLetterParams,
} from "@/lib/db/schema/gradeLetters";
import { createGradeLetter, deleteGradeLetter, updateGradeLetter } from "@/lib/api/gradeLetters/mutations";

export const gradeLettersRouter = router({
  getGradeLetters: publicProcedure.query(async () => {
    return getGradeLetters();
  }),
  getGradeLetterById: publicProcedure.input(gradeLetterIdSchema).query(async ({ input }) => {
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
