import { getCourseModuleById, getCourseModules } from "@/lib/api/courseModules/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseModuleIdSchema,
  insertCourseModuleParams,
  updateCourseModuleParams,
} from "@/lib/db/schema/courseModules";
import { createCourseModule, deleteCourseModule, updateCourseModule } from "@/lib/api/courseModules/mutations";

export const courseModulesRouter = router({
  getCourseModules: publicProcedure.query(async () => {
    return getCourseModules();
  }),
  getCourseModuleById: publicProcedure.input(courseModuleIdSchema).query(async ({ input }) => {
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
