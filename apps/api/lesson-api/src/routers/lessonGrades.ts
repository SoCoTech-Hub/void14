import {
  insertLessonGradeParams,
  lessonGradeIdSchema,
  updateLessonGradeParams,
} from "@soco/lesson-db/schema/lessonGrades";

import {
  createLessonGrade,
  deleteLessonGrade,
  updateLessonGrade,
} from "../api/lessonGrades/mutations";
import {
  getLessonGradeById,
  getLessonGrades,
} from "../api/lessonGrades/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lessonGradesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getLessonGrades: publicProcedure.query(async () => {
      return getLessonGrades();
    }),
    getLessonGradeById: publicProcedure
      .input(lessonGradeIdSchema)
      .query(async ({ input }) => {
        return getLessonGradeById(input.id);
      }),
    createLessonGrade: publicProcedure
      .input(insertLessonGradeParams)
      .mutation(async ({ input }) => {
        return createLessonGrade(input);
      }),
    updateLessonGrade: publicProcedure
      .input(updateLessonGradeParams)
      .mutation(async ({ input }) => {
        return updateLessonGrade(input.id, input);
      }),
    deleteLessonGrade: publicProcedure
      .input(lessonGradeIdSchema)
      .mutation(async ({ input }) => {
        return deleteLessonGrade(input.id);
      }),
  });
