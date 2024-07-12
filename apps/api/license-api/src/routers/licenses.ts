import {
  insertLicenseParams,
  licenseIdSchema,
  updateLicenseParams,
} from "@soco/license-db/schema/licenses";

import {
  createLicense,
  deleteLicense,
  updateLicense,
} from "../api/licenses/mutations";
import { getLicenseById, getLicenses } from "../api/licenses/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const licensesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getLicenses: publicProcedure.query(async () => {
      return getLicenses();
    }),
    getLicenseById: publicProcedure
      .input(licenseIdSchema)
      .query(async ({ input }) => {
        return getLicenseById(input.id);
      }),
    createLicense: publicProcedure
      .input(insertLicenseParams)
      .mutation(async ({ input }) => {
        return createLicense(input);
      }),
    updateLicense: publicProcedure
      .input(updateLicenseParams)
      .mutation(async ({ input }) => {
        return updateLicense(input.id, input);
      }),
    deleteLicense: publicProcedure
      .input(licenseIdSchema)
      .mutation(async ({ input }) => {
        return deleteLicense(input.id);
      }),
  });
