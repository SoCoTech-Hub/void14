import { getStickerById, getStickers } from "@/lib/api/stickers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  stickerIdSchema,
  insertStickerParams,
  updateStickerParams,
} from "@/lib/db/schema/stickers";
import { createSticker, deleteSticker, updateSticker } from "@/lib/api/stickers/mutations";

export const stickersRouter = router({
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
