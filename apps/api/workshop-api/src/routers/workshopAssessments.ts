import {
  insertWorkshopAssessmentParams,
  updateWorkshopAssessmentParams,
  workshopAssessmentIdSchema,
} from "@soco/workshop-db/schema/workshopAssessments";

import {
  createWorkshopAssessment,
  deleteWorkshopAssessment,
  updateWorkshopAssessment,
} from "../api/workshopAssessments/mutations";
import {
  getWorkshopAssessmentById,
  getWorkshopAssessments,
} from "../api/workshopAssessments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const workshopAssessmentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
