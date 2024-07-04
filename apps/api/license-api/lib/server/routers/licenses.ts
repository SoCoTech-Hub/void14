import {
  createLicense,
  deleteLicense,
  updateLicense,
} from "../api/licenses/mutations";
import { getLicenseById, getLicenses } from "../api/licenses/queries";
import {
  insertLicenseParams,
  licenseIdSchema,
  updateLicenseParams,
} from "../db/schema/licenses";
import { publicProcedure, router } from "../server/trpc";

export const licensesRouter = router({
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
