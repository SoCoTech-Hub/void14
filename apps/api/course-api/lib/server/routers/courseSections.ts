import { getCourseSectionById, getCourseSections } from "@/lib/api/courseSections/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseSectionIdSchema,
  insertCourseSectionParams,
  updateCourseSectionParams,
} from "@/lib/db/schema/courseSections";
import { createCourseSection, deleteCourseSection, updateCourseSection } from "@/lib/api/courseSections/mutations";

export const courseSectionsRouter = router({
  getCourseSections: publicProcedure.query(async () => {
    return getCourseSections();
  }),
  getCourseSectionById: publicProcedure.input(courseSectionIdSchema).query(async ({ input }) => {
    return getCourseSectionById(input.id);
  }),
  createCourseSection: publicProcedure
    .input(insertCourseSectionParams)
    .mutation(async ({ input }) => {
      return createCourseSection(input);
    }),
  updateCourseSection: publicProcedure
    .input(updateCourseSectionParams)
    .mutation(async ({ input }) => {
      return updateCourseSection(input.id, input);
    }),
  deleteCourseSection: publicProcedure
    .input(courseSectionIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseSection(input.id);
    }),
});
