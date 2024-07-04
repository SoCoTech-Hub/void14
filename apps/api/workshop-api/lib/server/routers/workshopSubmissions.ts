import {
  createWorkshopSubmission,
  deleteWorkshopSubmission,
  updateWorkshopSubmission,
} from "../api/workshopSubmissions/mutations";
import {
  getWorkshopSubmissionById,
  getWorkshopSubmissions,
} from "../api/workshopSubmissions/queries";
import {
  insertWorkshopSubmissionParams,
  updateWorkshopSubmissionParams,
  workshopSubmissionIdSchema,
} from "../db/schema/workshopSubmissions";
import { publicProcedure, router } from "../server/trpc";

export const workshopSubmissionsRouter = router({
  getWorkshopSubmissions: publicProcedure.query(async () => {
    return getWorkshopSubmissions();
  }),
  getWorkshopSubmissionById: publicProcedure
    .input(workshopSubmissionIdSchema)
    .query(async ({ input }) => {
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
