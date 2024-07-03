import { getCompetencyUserCompCourseById, getCompetencyUserCompCourses } from "@/lib/api/competencyUserCompCourses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  competencyUserCompCourseIdSchema,
  insertCompetencyUserCompCourseParams,
  updateCompetencyUserCompCourseParams,
} from "@/lib/db/schema/competencyUserCompCourses";
import { createCompetencyUserCompCourse, deleteCompetencyUserCompCourse, updateCompetencyUserCompCourse } from "@/lib/api/competencyUserCompCourses/mutations";

export const competencyUserCompCoursesRouter = router({
  getCompetencyUserCompCourses: publicProcedure.query(async () => {
    return getCompetencyUserCompCourses();
  }),
  getCompetencyUserCompCourseById: publicProcedure.input(competencyUserCompCourseIdSchema).query(async ({ input }) => {
    return getCompetencyUserCompCourseById(input.id);
  }),
  createCompetencyUserCompCourse: publicProcedure
    .input(insertCompetencyUserCompCourseParams)
    .mutation(async ({ input }) => {
      return createCompetencyUserCompCourse(input);
    }),
  updateCompetencyUserCompCourse: publicProcedure
    .input(updateCompetencyUserCompCourseParams)
    .mutation(async ({ input }) => {
      return updateCompetencyUserCompCourse(input.id, input);
    }),
  deleteCompetencyUserCompCourse: publicProcedure
    .input(competencyUserCompCourseIdSchema)
    .mutation(async ({ input }) => {
      return deleteCompetencyUserCompCourse(input.id);
    }),
});
