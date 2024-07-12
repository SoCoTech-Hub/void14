import {
  insertJobApplicationParams,
  jobApplicationIdSchema,
  updateJobApplicationParams,
} from "@soco/application-db/schema/jobApplications";

import {
  createJobApplication,
  deleteJobApplication,
  updateJobApplication,
} from "../api/jobApplications/mutations";
import {
  getJobApplicationById,
  getJobApplications,
} from "../api/jobApplications/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const jobApplicationsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getJobApplications: publicProcedure.query(async () => {
      return getJobApplications();
    }),
    getJobApplicationById: publicProcedure
      .input(jobApplicationIdSchema)
      .query(async ({ input }) => {
        return getJobApplicationById(input.id);
      }),
    createJobApplication: publicProcedure
      .input(insertJobApplicationParams)
      .mutation(async ({ input }) => {
        return createJobApplication(input);
      }),
    updateJobApplication: publicProcedure
      .input(updateJobApplicationParams)
      .mutation(async ({ input }) => {
        return updateJobApplication(input.id, input);
      }),
    deleteJobApplication: publicProcedure
      .input(jobApplicationIdSchema)
      .mutation(async ({ input }) => {
        return deleteJobApplication(input.id);
      }),
  });
