import {
  createLessonGrade,
  deleteLessonGrade,
  updateLessonGrade,
} from "../api/lessonGrades/mutations";
import {
  getLessonGradeById,
  getLessonGrades,
} from "../api/lessonGrades/queries";
import {
  insertLessonGradeParams,
  lessonGradeIdSchema,
  updateLessonGradeParams,
} from "../db/schema/lessonGrades";
import { publicProcedure, router } from "../server/trpc";

export const lessonGradesRouter = router({
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
