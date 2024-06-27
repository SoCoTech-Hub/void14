import { getLessonGradeById, getLessonGrades } from "@/lib/api/lessonGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonGradeIdSchema,
  insertLessonGradeParams,
  updateLessonGradeParams,
} from "@/lib/db/schema/lessonGrades";
import { createLessonGrade, deleteLessonGrade, updateLessonGrade } from "@/lib/api/lessonGrades/mutations";

export const lessonGradesRouter = router({
  getLessonGrades: publicProcedure.query(async () => {
    return getLessonGrades();
  }),
  getLessonGradeById: publicProcedure.input(lessonGradeIdSchema).query(async ({ input }) => {
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
