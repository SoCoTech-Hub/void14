import { getSocialIconById, getSocialIcons } from "@/lib/api/socialIcons/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialIconIdSchema,
  insertSocialIconParams,
  updateSocialIconParams,
} from "@/lib/db/schema/socialIcons";
import { createSocialIcon, deleteSocialIcon, updateSocialIcon } from "@/lib/api/socialIcons/mutations";

export const socialIconsRouter = router({
  getSocialIcons: publicProcedure.query(async () => {
    return getSocialIcons();
  }),
  getSocialIconById: publicProcedure.input(socialIconIdSchema).query(async ({ input }) => {
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
