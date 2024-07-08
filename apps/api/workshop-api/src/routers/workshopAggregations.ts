import { getWorkshopAggregationById, getWorkshopAggregations } from "../api/workshopAggregations/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopAggregationIdSchema,
  insertWorkshopAggregationParams,
  updateWorkshopAggregationParams,
} from "@soco/workshop-db/schema/workshopAggregations";
import { createWorkshopAggregation, deleteWorkshopAggregation, updateWorkshopAggregation } from "../api/workshopAggregations/mutations";

export const workshopAggregationsRouter =createTRPCRouter({
  getWorkshopAggregations: publicProcedure.query(async () => {
    return getWorkshopAggregations();
  }),
  getWorkshopAggregationById: publicProcedure.input(workshopAggregationIdSchema).query(async ({ input }) => {
    return getWorkshopAggregationById(input.id);
  }),
  createWorkshopAggregation: publicProcedure
    .input(insertWorkshopAggregationParams)
    .mutation(async ({ input }) => {
      return createWorkshopAggregation(input);
    }),
  updateWorkshopAggregation: publicProcedure
    .input(updateWorkshopAggregationParams)
    .mutation(async ({ input }) => {
      return updateWorkshopAggregation(input.id, input);
    }),
  deleteWorkshopAggregation: publicProcedure
    .input(workshopAggregationIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopAggregation(input.id);
    }),
});
