import { getSocialLinkById, getSocialLinks } from "@/lib/api/socialLinks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialLinkIdSchema,
  insertSocialLinkParams,
  updateSocialLinkParams,
} from "@/lib/db/schema/socialLinks";
import { createSocialLink, deleteSocialLink, updateSocialLink } from "@/lib/api/socialLinks/mutations";

export const socialLinksRouter = router({
  getSocialLinks: publicProcedure.query(async () => {
    return getSocialLinks();
  }),
  getSocialLinkById: publicProcedure.input(socialLinkIdSchema).query(async ({ input }) => {
    return getSocialLinkById(input.id);
  }),
  createSocialLink: publicProcedure
    .input(insertSocialLinkParams)
    .mutation(async ({ input }) => {
      return createSocialLink(input);
    }),
  updateSocialLink: publicProcedure
    .input(updateSocialLinkParams)
    .mutation(async ({ input }) => {
      return updateSocialLink(input.id, input);
    }),
  deleteSocialLink: publicProcedure
    .input(socialLinkIdSchema)
    .mutation(async ({ input }) => {
      return deleteSocialLink(input.id);
    }),
});
