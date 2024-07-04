import { createScale, deleteScale, updateScale } from "../api/scales/mutations";
import { getScaleById, getScales } from "../api/scales/queries";
import {
  insertScaleParams,
  scaleIdSchema,
  updateScaleParams,
} from "../db/schema/scales";
import { publicProcedure, router } from "../server/trpc";

export const scalesRouter = router({
  getScales: publicProcedure.query(async () => {
    return getScales();
  }),
  getScaleById: publicProcedure
    .input(scaleIdSchema)
    .query(async ({ input }) => {
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
