import { getSocialEmojiById, getSocialEmojis } from "../api/socialEmojis/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  socialEmojiIdSchema,
  insertSocialEmojiParams,
  updateSocialEmojiParams,
} from "@soco/social-db/schema/socialEmojis";
import { createSocialEmoji, deleteSocialEmoji, updateSocialEmoji } from "../api/socialEmojis/mutations";

export const socialEmojisRouter =createTRPCRouter({
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
