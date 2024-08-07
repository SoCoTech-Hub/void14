import {
  insertMediaParams,
  mediaIdSchema,
  updateMediaParams,
} from "@soco/media-db/schema/medias";

import { createMedia, deleteMedia, updateMedia } from "../api/medias/mutations";
import { getMediaById, getMedias } from "../api/medias/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mediasRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getMedias: publicProcedure.query(async () => {
      return getMedias();
    }),
    getMediaById: publicProcedure
      .input(mediaIdSchema)
      .query(async ({ input }) => {
        return getMediaById(input.id);
      }),
    createMedia: publicProcedure
      .input(insertMediaParams)
      .mutation(async ({ input }) => {
        return createMedia(input);
      }),
    updateMedia: publicProcedure
      .input(updateMediaParams)
      .mutation(async ({ input }) => {
        return updateMedia(input.id, input);
      }),
    deleteMedia: publicProcedure
      .input(mediaIdSchema)
      .mutation(async ({ input }) => {
        return deleteMedia(input.id);
      }),
  });
