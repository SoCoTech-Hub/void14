import { getWorkshopSubmissionById, getWorkshopSubmissions } from "@/lib/api/workshopSubmissions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopSubmissionIdSchema,
  insertWorkshopSubmissionParams,
  updateWorkshopSubmissionParams,
} from "@/lib/db/schema/workshopSubmissions";
import { createWorkshopSubmission, deleteWorkshopSubmission, updateWorkshopSubmission } from "@/lib/api/workshopSubmissions/mutations";

export const workshopSubmissionsRouter = router({
  getWorkshopSubmissions: publicProcedure.query(async () => {
    return getWorkshopSubmissions();
  }),
  getWorkshopSubmissionById: publicProcedure.input(workshopSubmissionIdSchema).query(async ({ input }) => {
    return getWorkshopSubmissionById(input.id);
  }),
  createWorkshopSubmission: publicProcedure
    .input(insertWorkshopSubmissionParams)
    .mutation(async ({ input }) => {
      return createWorkshopSubmission(input);
    }),
  updateWorkshopSubmission: publicProcedure
    .input(updateWorkshopSubmissionParams)
    .mutation(async ({ input }) => {
      return updateWorkshopSubmission(input.id, input);
    }),
  deleteWorkshopSubmission: publicProcedure
    .input(workshopSubmissionIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopSubmission(input.id);
    }),
});
