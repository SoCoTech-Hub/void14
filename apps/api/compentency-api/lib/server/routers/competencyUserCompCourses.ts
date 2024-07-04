import {
  createCompetencyUserCompCourse,
  deleteCompetencyUserCompCourse,
  updateCompetencyUserCompCourse,
} from "../api/competencyUserCompCourses/mutations";
import {
  getCompetencyUserCompCourseById,
  getCompetencyUserCompCourses,
} from "../api/competencyUserCompCourses/queries";
import {
  competencyUserCompCourseIdSchema,
  insertCompetencyUserCompCourseParams,
  updateCompetencyUserCompCourseParams,
} from "../db/schema/competencyUserCompCourses";
import { publicProcedure, router } from "../server/trpc";

export const competencyUserCompCoursesRouter = router({
  getCompetencyUserCompCourses: publicProcedure.query(async () => {
    return getCompetencyUserCompCourses();
  }),
  getCompetencyUserCompCourseById: publicProcedure
    .input(competencyUserCompCourseIdSchema)
    .query(async ({ input }) => {
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
