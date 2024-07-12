import {
  insertOauth2UserFieldMappingParams,
  oauth2UserFieldMappingIdSchema,
  updateOauth2UserFieldMappingParams,
} from "@soco/oauth2-db/schema/oauth2UserFieldMappings";

import {
  createOauth2UserFieldMapping,
  deleteOauth2UserFieldMapping,
  updateOauth2UserFieldMapping,
} from "../api/oauth2UserFieldMappings/mutations";
import {
  getOauth2UserFieldMappingById,
  getOauth2UserFieldMappings,
} from "../api/oauth2UserFieldMappings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const oauth2UserFieldMappingsRouter: ReturnType<
  typeof createTRPCRouter
> = createTRPCRouter({
  getOauth2UserFieldMappings: publicProcedure.query(async () => {
    return getOauth2UserFieldMappings();
  }),
  getOauth2UserFieldMappingById: publicProcedure
    .input(oauth2UserFieldMappingIdSchema)
    .query(async ({ input }) => {
      return getOauth2UserFieldMappingById(input.id);
    }),
  createOauth2UserFieldMapping: publicProcedure
    .input(insertOauth2UserFieldMappingParams)
    .mutation(async ({ input }) => {
      return createOauth2UserFieldMapping(input);
    }),
  updateOauth2UserFieldMapping: publicProcedure
    .input(updateOauth2UserFieldMappingParams)
    .mutation(async ({ input }) => {
      return updateOauth2UserFieldMapping(input.id, input);
    }),
  deleteOauth2UserFieldMapping: publicProcedure
    .input(oauth2UserFieldMappingIdSchema)
    .mutation(async ({ input }) => {
      return deleteOauth2UserFieldMapping(input.id);
    }),
});
