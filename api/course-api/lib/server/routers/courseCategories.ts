import { getCourseCategoryById, getCourseCategories } from "@/lib/api/courseCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  courseCategoryIdSchema,
  insertCourseCategoryParams,
  updateCourseCategoryParams,
} from "@/lib/db/schema/courseCategories";
import { createCourseCategory, deleteCourseCategory, updateCourseCategory } from "@/lib/api/courseCategories/mutations";

export const courseCategoriesRouter = router({
  getCourseCategories: publicProcedure.query(async () => {
    return getCourseCategories();
  }),
  getCourseCategoryById: publicProcedure.input(courseCategoryIdSchema).query(async ({ input }) => {
    return getCourseCategoryById(input.id);
  }),
  createCourseCategory: publicProcedure
    .input(insertCourseCategoryParams)
    .mutation(async ({ input }) => {
      return createCourseCategory(input);
    }),
  updateCourseCategory: publicProcedure
    .input(updateCourseCategoryParams)
    .mutation(async ({ input }) => {
      return updateCourseCategory(input.id, input);
    }),
  deleteCourseCategory: publicProcedure
    .input(courseCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteCourseCategory(input.id);
    }),
});
