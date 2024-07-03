import { getScaleById, getScales } from "@/lib/api/scales/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  scaleIdSchema,
  insertScaleParams,
  updateScaleParams,
} from "@/lib/db/schema/scales";
import { createScale, deleteScale, updateScale } from "@/lib/api/scales/mutations";

export const scalesRouter = router({
  getScales: publicProcedure.query(async () => {
    return getScales();
  }),
  getScaleById: publicProcedure.input(scaleIdSchema).query(async ({ input }) => {
    return getScaleById(input.id);
  }),
  createScale: publicProcedure
    .input(insertScaleParams)
    .mutation(async ({ input }) => {
      return createScale(input);
    }),
  updateScale: publicProcedure
    .input(updateScaleParams)
    .mutation(async ({ input }) => {
      return updateScale(input.id, input);
    }),
  deleteScale: publicProcedure
    .input(scaleIdSchema)
    .mutation(async ({ input }) => {
      return deleteScale(input.id);
    }),
});
