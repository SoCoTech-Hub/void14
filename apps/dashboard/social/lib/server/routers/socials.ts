import { getSocialById, getSocials } from "@/lib/api/socials/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  socialIdSchema,
  insertSocialParams,
  updateSocialParams,
} from "@/lib/db/schema/socials";
import { createSocial, deleteSocial, updateSocial } from "@/lib/api/socials/mutations";

export const socialsRouter = router({
  getSocials: publicProcedure.query(async () => {
    return getSocials();
  }),
  getSocialById: publicProcedure.input(socialIdSchema).query(async ({ input }) => {
    return getSocialById(input.id);
  }),
  createSocial: publicProcedure
    .input(insertSocialParams)
    .mutation(async ({ input }) => {
      return createSocial(input);
    }),
  updateSocial: publicProcedure
    .input(updateSocialParams)
    .mutation(async ({ input }) => {
      return updateSocial(input.id, input);
    }),
  deleteSocial: publicProcedure
    .input(socialIdSchema)
    .mutation(async ({ input }) => {
      return deleteSocial(input.id);
    }),
});
