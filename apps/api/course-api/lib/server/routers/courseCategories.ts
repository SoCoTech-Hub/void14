import {
  createCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
} from "../api/courseCategories/mutations";
import {
  getCourseCategories,
  getCourseCategoryById,
} from "../api/courseCategories/queries";
import {
  courseCategoryIdSchema,
  insertCourseCategoryParams,
  updateCourseCategoryParams,
} from "../db/schema/courseCategories";
import { publicProcedure, router } from "../server/trpc";

export const courseCategoriesRouter = router({
  getCourseCategories: publicProcedure.query(async () => {
    return getCourseCategories();
  }),
  getCourseCategoryById: publicProcedure
    .input(courseCategoryIdSchema)
    .query(async ({ input }) => {
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
