import {
  insertSocialParams,
  socialIdSchema,
  updateSocialParams,
} from "@soco/social-db/schema/socials";

import {
  createSocial,
  deleteSocial,
  updateSocial,
} from "../api/socials/mutations";
import { getSocialById, getSocials } from "../api/socials/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const socialsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getSocials: publicProcedure.query(async () => {
      return getSocials();
    }),
    getSocialById: publicProcedure
      .input(socialIdSchema)
      .query(async ({ input }) => {
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
