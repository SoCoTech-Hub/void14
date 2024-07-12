import {
  insertZoomParams,
  updateZoomParams,
  zoomIdSchema,
} from "@soco/zoom-db/schema/zooms";

import { createZoom, deleteZoom, updateZoom } from "../api/zooms/mutations";
import { getZoomById, getZooms } from "../api/zooms/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const zoomsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getZooms: publicProcedure.query(async () => {
      return getZooms();
    }),
    getZoomById: publicProcedure
      .input(zoomIdSchema)
      .query(async ({ input }) => {
        return getZoomById(input.id);
      }),
    createZoom: publicProcedure
      .input(insertZoomParams)
      .mutation(async ({ input }) => {
        return createZoom(input);
      }),
    updateZoom: publicProcedure
      .input(updateZoomParams)
      .mutation(async ({ input }) => {
        return updateZoom(input.id, input);
      }),
    deleteZoom: publicProcedure
      .input(zoomIdSchema)
      .mutation(async ({ input }) => {
        return deleteZoom(input.id);
      }),
  });
