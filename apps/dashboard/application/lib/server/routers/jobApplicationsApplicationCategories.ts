import { getJobApplicationsApplicationCategoryById, getJobApplicationsApplicationCategories } from "@/lib/api/jobApplicationsApplicationCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  jobApplicationsApplicationCategoryIdSchema,
  insertJobApplicationsApplicationCategoryParams,
  updateJobApplicationsApplicationCategoryParams,
} from "@/lib/db/schema/jobApplicationsApplicationCategories";
import { createJobApplicationsApplicationCategory, deleteJobApplicationsApplicationCategory, updateJobApplicationsApplicationCategory } from "@/lib/api/jobApplicationsApplicationCategories/mutations";

export const jobApplicationsApplicationCategoriesRouter = router({
  getJobApplicationsApplicationCategories: publicProcedure.query(async () => {
    return getJobApplicationsApplicationCategories();
  }),
  getJobApplicationsApplicationCategoryById: publicProcedure.input(jobApplicationsApplicationCategoryIdSchema).query(async ({ input }) => {
    return getJobApplicationsApplicationCategoryById(input.id);
  }),
  createJobApplicationsApplicationCategory: publicProcedure
    .input(insertJobApplicationsApplicationCategoryParams)
    .mutation(async ({ input }) => {
      return createJobApplicationsApplicationCategory(input);
    }),
  updateJobApplicationsApplicationCategory: publicProcedure
    .input(updateJobApplicationsApplicationCategoryParams)
    .mutation(async ({ input }) => {
      return updateJobApplicationsApplicationCategory(input.id, input);
    }),
  deleteJobApplicationsApplicationCategory: publicProcedure
    .input(jobApplicationsApplicationCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteJobApplicationsApplicationCategory(input.id);
    }),
});
