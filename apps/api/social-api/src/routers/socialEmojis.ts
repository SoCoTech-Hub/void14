import {
  insertSocialEmojiParams,
  socialEmojiIdSchema,
  updateSocialEmojiParams,
} from "@soco/social-db/schema/socialEmojis";

import {
  createSocialEmoji,
  deleteSocialEmoji,
  updateSocialEmoji,
} from "../api/socialEmojis/mutations";
import {
  getSocialEmojiById,
  getSocialEmojis,
} from "../api/socialEmojis/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const socialEmojisRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSocialEmojis: publicProcedure.query(async () => {
      return getSocialEmojis();
    }),
    getSocialEmojiById: publicProcedure
      .input(socialEmojiIdSchema)
      .query(async ({ input }) => {
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
