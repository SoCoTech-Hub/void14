import {
  createSocialLink,
  deleteSocialLink,
  updateSocialLink,
} from "../api/socialLinks/mutations";
import { getSocialLinkById, getSocialLinks } from "../api/socialLinks/queries";
import {
  insertSocialLinkParams,
  socialLinkIdSchema,
  updateSocialLinkParams,
} from "../db/schema/socialLinks";
import { publicProcedure, router } from "../server/trpc";

export const socialLinksRouter = router({
  getSocialLinks: publicProcedure.query(async () => {
    return getSocialLinks();
  }),
  getSocialLinkById: publicProcedure
    .input(socialLinkIdSchema)
    .query(async ({ input }) => {
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
