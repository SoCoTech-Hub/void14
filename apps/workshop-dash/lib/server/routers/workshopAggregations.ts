import { getWorkshopAggregationById, getWorkshopAggregations } from "@/lib/api/workshopAggregations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopAggregationIdSchema,
  insertWorkshopAggregationParams,
  updateWorkshopAggregationParams,
} from "@/lib/db/schema/workshopAggregations";
import { createWorkshopAggregation, deleteWorkshopAggregation, updateWorkshopAggregation } from "@/lib/api/workshopAggregations/mutations";

export const workshopAggregationsRouter = router({
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
