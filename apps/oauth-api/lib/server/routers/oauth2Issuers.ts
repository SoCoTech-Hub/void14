import { getOauth2IssuerById, getOauth2Issuers } from "@/lib/api/oauth2Issuers/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  oauth2IssuerIdSchema,
  insertOauth2IssuerParams,
  updateOauth2IssuerParams,
} from "@/lib/db/schema/oauth2Issuers";
import { createOauth2Issuer, deleteOauth2Issuer, updateOauth2Issuer } from "@/lib/api/oauth2Issuers/mutations";

export const oauth2IssuersRouter = router({
  getOauth2Issuers: publicProcedure.query(async () => {
    return getOauth2Issuers();
  }),
  getOauth2IssuerById: publicProcedure.input(oauth2IssuerIdSchema).query(async ({ input }) => {
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
