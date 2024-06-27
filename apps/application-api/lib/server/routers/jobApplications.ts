import { getJobApplicationById, getJobApplications } from "@/lib/api/jobApplications/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  jobApplicationIdSchema,
  insertJobApplicationParams,
  updateJobApplicationParams,
} from "@/lib/db/schema/jobApplications";
import { createJobApplication, deleteJobApplication, updateJobApplication } from "@/lib/api/jobApplications/mutations";

export const jobApplicationsRouter = router({
  getJobApplications: publicProcedure.query(async () => {
    return getJobApplications();
  }),
  getJobApplicationById: publicProcedure.input(jobApplicationIdSchema).query(async ({ input }) => {
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
