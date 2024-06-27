import { getWorkshopFormAccumulativeById, getWorkshopFormAccumulatives } from "@/lib/api/workshopFormAccumulatives/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopFormAccumulativeIdSchema,
  insertWorkshopFormAccumulativeParams,
  updateWorkshopFormAccumulativeParams,
} from "@/lib/db/schema/workshopFormAccumulatives";
import { createWorkshopFormAccumulative, deleteWorkshopFormAccumulative, updateWorkshopFormAccumulative } from "@/lib/api/workshopFormAccumulatives/mutations";

export const workshopFormAccumulativesRouter = router({
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
