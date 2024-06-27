import { getSocialEmojiById, getSocialEmojis } from "@/lib/api/socialEmojis/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialEmojiIdSchema,
  insertSocialEmojiParams,
  updateSocialEmojiParams,
} from "@/lib/db/schema/socialEmojis";
import { createSocialEmoji, deleteSocialEmoji, updateSocialEmoji } from "@/lib/api/socialEmojis/mutations";

export const socialEmojisRouter = router({
  getSocialEmojis: publicProcedure.query(async () => {
    return getSocialEmojis();
  }),
  getSocialEmojiById: publicProcedure.input(socialEmojiIdSchema).query(async ({ input }) => {
    return getSocialEmojiById(input.id);
  }),
  createSocialEmoji: publicProcedure
    .input(insertSocialEmojiParams)
    .mutation(async ({ input }) => {
      return createSocialEmoji(input);
    }),
  updateSocialEmoji: publicProcedure
    .input(updateSocialEmojiParams)
    .mutation(async ({ input }) => {
      return updateSocialEmoji(input.id, input);
    }),
  deleteSocialEmoji: publicProcedure
    .input(socialEmojiIdSchema)
    .mutation(async ({ input }) => {
      return deleteSocialEmoji(input.id);
    }),
});
