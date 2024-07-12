import {
  insertSocialIconParams,
  socialIconIdSchema,
  updateSocialIconParams,
} from "@soco/blog-db/schema/socialIcons";

import {
  createSocialIcon,
  deleteSocialIcon,
  updateSocialIcon,
} from "../api/socialIcons/mutations";
import { getSocialIconById, getSocialIcons } from "../api/socialIcons/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const socialIconsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSocialIcons: publicProcedure.query(async () => {
      return getSocialIcons();
    }),
    getSocialIconById: publicProcedure
      .input(socialIconIdSchema)
      .query(async ({ input }) => {
        return getSocialIconById(input.id);
      }),
    createSocialIcon: publicProcedure
      .input(insertSocialIconParams)
      .mutation(async ({ input }) => {
        return createSocialIcon(input);
      }),
    updateSocialIcon: publicProcedure
      .input(updateSocialIconParams)
      .mutation(async ({ input }) => {
        return updateSocialIcon(input.id, input);
      }),
    deleteSocialIcon: publicProcedure
      .input(socialIconIdSchema)
      .mutation(async ({ input }) => {
        return deleteSocialIcon(input.id);
      }),
  });
