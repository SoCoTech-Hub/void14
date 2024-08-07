import {
  insertJobApplicationsApplicationCategoryParams,
  jobApplicationsApplicationCategoryIdSchema,
  updateJobApplicationsApplicationCategoryParams,
} from "@soco/application-db/schema/jobApplicationsApplicationCategories";

import {
  createJobApplicationsApplicationCategory,
  deleteJobApplicationsApplicationCategory,
  updateJobApplicationsApplicationCategory,
} from "../api/jobApplicationsApplicationCategories/mutations";
import {
  getJobApplicationsApplicationCategories,
  getJobApplicationsApplicationCategoryById,
} from "../api/jobApplicationsApplicationCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const jobApplicationsApplicationCategoriesRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getJobApplicationsApplicationCategories: publicProcedure.query(async () => {
    return getJobApplicationsApplicationCategories();
  }),
  getJobApplicationsApplicationCategoryById: publicProcedure
    .input(jobApplicationsApplicationCategoryIdSchema)
    .query(async ({ input }) => {
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
