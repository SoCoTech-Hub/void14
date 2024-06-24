import { getLicenseById, getLicenses } from "@/lib/api/licenses/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  licenseIdSchema,
  insertLicenseParams,
  updateLicenseParams,
} from "@/lib/db/schema/licenses";
import { createLicense, deleteLicense, updateLicense } from "@/lib/api/licenses/mutations";

export const licensesRouter = router({
  getLicenses: publicProcedure.query(async () => {
    return getLicenses();
  }),
  getLicenseById: publicProcedure.input(licenseIdSchema).query(async ({ input }) => {
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
