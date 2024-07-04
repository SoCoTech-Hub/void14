import {
  createCourseModule,
  deleteCourseModule,
  updateCourseModule,
} from "../api/courseModules/mutations";
import {
  getCourseModuleById,
  getCourseModules,
} from "../api/courseModules/queries";
import {
  courseModuleIdSchema,
  insertCourseModuleParams,
  updateCourseModuleParams,
} from "../db/schema/courseModules";
import { publicProcedure, router } from "../server/trpc";

export const courseModulesRouter = router({
  getCourseModules: publicProcedure.query(async () => {
    return getCourseModules();
  }),
  getCourseModuleById: publicProcedure
    .input(courseModuleIdSchema)
    .query(async ({ input }) => {
      return getCourseModuleById(input.id);
    }),
  createCourseModule: publicProcedure
    .input(insertCourseModuleParams)
    .mutation(async ({ input }) => {
      return createCourseModule(input);
    }),
  updateCourseModule: publicProcedure
    .input(updateCourseModuleParams)
    .mutation(async ({ input }) => {
      return updateCourseModule(input.id, input);
    }),
  deleteCourseModule: publicProcedure
    .input(courseModuleIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseModule(input.id);
    }),
});
