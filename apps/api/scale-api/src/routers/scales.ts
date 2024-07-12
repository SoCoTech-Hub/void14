import {
  insertScaleParams,
  scaleIdSchema,
  updateScaleParams,
} from "@soco/scale-db/schema/scales";

import { createScale, deleteScale, updateScale } from "../api/scales/mutations";
import { getScaleById, getScales } from "../api/scales/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const scalesRouter = createTRPCRouter({
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
