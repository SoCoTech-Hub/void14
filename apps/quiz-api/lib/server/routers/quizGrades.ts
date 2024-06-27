import { getQuizGradeById, getQuizGrades } from "@/lib/api/quizGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  quizGradeIdSchema,
  insertQuizGradeParams,
  updateQuizGradeParams,
} from "@/lib/db/schema/quizGrades";
import { createQuizGrade, deleteQuizGrade, updateQuizGrade } from "@/lib/api/quizGrades/mutations";

export const quizGradesRouter = router({
  getQuizGrades: publicProcedure.query(async () => {
    return getQuizGrades();
  }),
  getQuizGradeById: publicProcedure.input(quizGradeIdSchema).query(async ({ input }) => {
    return getQuizGradeById(input.id);
  }),
  createQuizGrade: publicProcedure
    .input(insertQuizGradeParams)
    .mutation(async ({ input }) => {
      return createQuizGrade(input);
    }),
  updateQuizGrade: publicProcedure
    .input(updateQuizGradeParams)
    .mutation(async ({ input }) => {
      return updateQuizGrade(input.id, input);
    }),
  deleteQuizGrade: publicProcedure
    .input(quizGradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteQuizGrade(input.id);
    }),
});
