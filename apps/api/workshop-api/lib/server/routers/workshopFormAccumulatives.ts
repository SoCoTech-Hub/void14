import {
  createWorkshopFormAccumulative,
  deleteWorkshopFormAccumulative,
  updateWorkshopFormAccumulative,
} from "../api/workshopFormAccumulatives/mutations";
import {
  getWorkshopFormAccumulativeById,
  getWorkshopFormAccumulatives,
} from "../api/workshopFormAccumulatives/queries";
import {
  insertWorkshopFormAccumulativeParams,
  updateWorkshopFormAccumulativeParams,
  workshopFormAccumulativeIdSchema,
} from "../db/schema/workshopFormAccumulatives";
import { publicProcedure, router } from "../server/trpc";

export const workshopFormAccumulativesRouter = router({
  getWorkshopFormAccumulatives: publicProcedure.query(async () => {
    return getWorkshopFormAccumulatives();
  }),
  getWorkshopFormAccumulativeById: publicProcedure
    .input(workshopFormAccumulativeIdSchema)
    .query(async ({ input }) => {
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
