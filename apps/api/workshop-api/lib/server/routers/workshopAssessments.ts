import { getWorkshopAssessmentById, getWorkshopAssessments } from "@/lib/api/workshopAssessments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopAssessmentIdSchema,
  insertWorkshopAssessmentParams,
  updateWorkshopAssessmentParams,
} from "@/lib/db/schema/workshopAssessments";
import { createWorkshopAssessment, deleteWorkshopAssessment, updateWorkshopAssessment } from "@/lib/api/workshopAssessments/mutations";

export const workshopAssessmentsRouter = router({
  getWorkshopAssessments: publicProcedure.query(async () => {
    return getWorkshopAssessments();
  }),
  getWorkshopAssessmentById: publicProcedure.input(workshopAssessmentIdSchema).query(async ({ input }) => {
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
