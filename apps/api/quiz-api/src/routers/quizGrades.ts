import { getQuizGradeById, getQuizGrades } from "../api/quizGrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  quizGradeIdSchema,
  insertQuizGradeParams,
  updateQuizGradeParams,
} from "@soco/quiz-db/schema/quizGrades";
import { createQuizGrade, deleteQuizGrade, updateQuizGrade } from "../api/quizGrades/mutations";

export const quizGradesRouter =createTRPCRouter({
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
