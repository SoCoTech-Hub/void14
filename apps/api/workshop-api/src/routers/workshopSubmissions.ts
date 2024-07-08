import { getWorkshopSubmissionById, getWorkshopSubmissions } from "../api/workshopSubmissions/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopSubmissionIdSchema,
  insertWorkshopSubmissionParams,
  updateWorkshopSubmissionParams,
} from "@soco/workshop-db/schema/workshopSubmissions";
import { createWorkshopSubmission, deleteWorkshopSubmission, updateWorkshopSubmission } from "../api/workshopSubmissions/mutations";

export const workshopSubmissionsRouter =createTRPCRouter({
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
