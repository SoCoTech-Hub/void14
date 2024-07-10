import { getJobApplicationsApplicationCategoryById, getJobApplicationsApplicationCategories } from "../api/jobApplicationsApplicationCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  jobApplicationsApplicationCategoryIdSchema,
  insertJobApplicationsApplicationCategoryParams,
  updateJobApplicationsApplicationCategoryParams,
} from "@soco/application-db/schema/jobApplicationsApplicationCategories";
import { createJobApplicationsApplicationCategory, deleteJobApplicationsApplicationCategory, updateJobApplicationsApplicationCategory } from "../api/jobApplicationsApplicationCategories/mutations";

export const jobApplicationsApplicationCategoriesRouter =createTRPCRouter({
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
