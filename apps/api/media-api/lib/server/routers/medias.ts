import { createMedia, deleteMedia, updateMedia } from "../api/medias/mutations";
import { getMediaById, getMedias } from "../api/medias/queries";
import {
  insertMediaParams,
  mediaIdSchema,
  updateMediaParams,
} from "../db/schema/medias";
import { publicProcedure, router } from "../server/trpc";

export const mediasRouter = router({
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
