import { getCompetencyUserCompCourseById, getCompetencyUserCompCourses } from "../api/competencyUserCompCourses/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  competencyUserCompCourseIdSchema,
  insertCompetencyUserCompCourseParams,
  updateCompetencyUserCompCourseParams,
} from "@soco/competency-db/schema/competencyUserCompCourses";
import { createCompetencyUserCompCourse, deleteCompetencyUserCompCourse, updateCompetencyUserCompCourse } from "../api/competencyUserCompCourses/mutations";

export const competencyUserCompCoursesRouter =createTRPCRouter({
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
