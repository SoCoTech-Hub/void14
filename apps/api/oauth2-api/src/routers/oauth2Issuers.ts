import {
  insertOauth2IssuerParams,
  oauth2IssuerIdSchema,
  updateOauth2IssuerParams,
} from "@soco/oauth2-db/schema/oauth2Issuers";

import {
  createOauth2Issuer,
  deleteOauth2Issuer,
  updateOauth2Issuer,
} from "../api/oauth2Issuers/mutations";
import {
  getOauth2IssuerById,
  getOauth2Issuers,
} from "../api/oauth2Issuers/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const oauth2IssuersRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getOauth2Issuers: publicProcedure.query(async () => {
      return getOauth2Issuers();
    }),
    getOauth2IssuerById: publicProcedure
      .input(oauth2IssuerIdSchema)
      .query(async ({ input }) => {
        return getOauth2IssuerById(input.id);
      }),
    createOauth2Issuer: publicProcedure
      .input(insertOauth2IssuerParams)
      .mutation(async ({ input }) => {
        return createOauth2Issuer(input);
      }),
    updateOauth2Issuer: publicProcedure
      .input(updateOauth2IssuerParams)
      .mutation(async ({ input }) => {
        return updateOauth2Issuer(input.id, input);
      }),
    deleteOauth2Issuer: publicProcedure
      .input(oauth2IssuerIdSchema)
      .mutation(async ({ input }) => {
        return deleteOauth2Issuer(input.id);
      }),
  });
