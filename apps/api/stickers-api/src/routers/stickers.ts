import { getStickerById, getStickers } from "../api/stickers/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  stickerIdSchema,
  insertStickerParams,
  updateStickerParams,
} from "@soco/stickers-db/schema/stickers";
import { createSticker, deleteSticker, updateSticker } from "../api/stickers/mutations";

export const stickersRouter =createTRPCRouter({
  getStickers: publicProcedure.query(async () => {
    return getStickers();
  }),
  getStickerById: publicProcedure.input(stickerIdSchema).query(async ({ input }) => {
    return getStickerById(input.id);
  }),
  createSticker: publicProcedure
    .input(insertStickerParams)
    .mutation(async ({ input }) => {
      return createSticker(input);
    }),
  updateSticker: publicProcedure
    .input(updateStickerParams)
    .mutation(async ({ input }) => {
      return updateSticker(input.id, input);
    }),
  deleteSticker: publicProcedure
    .input(stickerIdSchema)
    .mutation(async ({ input }) => {
      return deleteSticker(input.id);
    }),
});
