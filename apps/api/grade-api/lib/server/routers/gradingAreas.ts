import { getGradingAreaById, getGradingAreas } from "@/lib/api/gradingAreas/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradingAreaIdSchema,
  insertGradingAreaParams,
  updateGradingAreaParams,
} from "@/lib/db/schema/gradingAreas";
import { createGradingArea, deleteGradingArea, updateGradingArea } from "@/lib/api/gradingAreas/mutations";

export const gradingAreasRouter = router({
  getGradingAreas: publicProcedure.query(async () => {
    return getGradingAreas();
  }),
  getGradingAreaById: publicProcedure.input(gradingAreaIdSchema).query(async ({ input }) => {
    return getGradingAreaById(input.id);
  }),
  createGradingArea: publicProcedure
    .input(insertGradingAreaParams)
    .mutation(async ({ input }) => {
      return createGradingArea(input);
    }),
  updateGradingArea: publicProcedure
    .input(updateGradingAreaParams)
    .mutation(async ({ input }) => {
      return updateGradingArea(input.id, input);
    }),
  deleteGradingArea: publicProcedure
    .input(gradingAreaIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradingArea(input.id);
    }),
});
