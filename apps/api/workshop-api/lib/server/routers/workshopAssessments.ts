import {
  createWorkshopAssessment,
  deleteWorkshopAssessment,
  updateWorkshopAssessment,
} from "../api/workshopAssessments/mutations";
import {
  getWorkshopAssessmentById,
  getWorkshopAssessments,
} from "../api/workshopAssessments/queries";
import {
  insertWorkshopAssessmentParams,
  updateWorkshopAssessmentParams,
  workshopAssessmentIdSchema,
} from "../db/schema/workshopAssessments";
import { publicProcedure, router } from "../server/trpc";

export const workshopAssessmentsRouter = router({
  getWorkshopAssessments: publicProcedure.query(async () => {
    return getWorkshopAssessments();
  }),
  getWorkshopAssessmentById: publicProcedure
    .input(workshopAssessmentIdSchema)
    .query(async ({ input }) => {
      return getWorkshopAssessmentById(input.id);
    }),
  createWorkshopAssessment: publicProcedure
    .input(insertWorkshopAssessmentParams)
    .mutation(async ({ input }) => {
      return createWorkshopAssessment(input);
    }),
  updateWorkshopAssessment: publicProcedure
    .input(updateWorkshopAssessmentParams)
    .mutation(async ({ input }) => {
      return updateWorkshopAssessment(input.id, input);
    }),
  deleteWorkshopAssessment: publicProcedure
    .input(workshopAssessmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopAssessment(input.id);
    }),
});
