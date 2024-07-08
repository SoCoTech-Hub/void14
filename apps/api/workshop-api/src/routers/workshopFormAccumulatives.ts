import { getWorkshopFormAccumulativeById, getWorkshopFormAccumulatives } from "../api/workshopFormAccumulatives/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopFormAccumulativeIdSchema,
  insertWorkshopFormAccumulativeParams,
  updateWorkshopFormAccumulativeParams,
} from "@soco/workshop-db/schema/workshopFormAccumulatives";
import { createWorkshopFormAccumulative, deleteWorkshopFormAccumulative, updateWorkshopFormAccumulative } from "../api/workshopFormAccumulatives/mutations";

export const workshopFormAccumulativesRouter =createTRPCRouter({
  getWorkshopFormAccumulatives: publicProcedure.query(async () => {
    return getWorkshopFormAccumulatives();
  }),
  getWorkshopFormAccumulativeById: publicProcedure.input(workshopFormAccumulativeIdSchema).query(async ({ input }) => {
    return getWorkshopFormAccumulativeById(input.id);
  }),
  createWorkshopFormAccumulative: publicProcedure
    .input(insertWorkshopFormAccumulativeParams)
    .mutation(async ({ input }) => {
      return createWorkshopFormAccumulative(input);
    }),
  updateWorkshopFormAccumulative: publicProcedure
    .input(updateWorkshopFormAccumulativeParams)
    .mutation(async ({ input }) => {
      return updateWorkshopFormAccumulative(input.id, input);
    }),
  deleteWorkshopFormAccumulative: publicProcedure
    .input(workshopFormAccumulativeIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopFormAccumulative(input.id);
    }),
});
