import {
  createCountryOrganization,
  deleteCountryOrganization,
  updateCountryOrganization,
} from "../api/countryOrganizations/mutations";
import {
  getCountryOrganizationById,
  getCountryOrganizations,
} from "../api/countryOrganizations/queries";
import {
  countryOrganizationIdSchema,
  insertCountryOrganizationParams,
  updateCountryOrganizationParams,
} from "../db/schema/countryOrganizations";
import { publicProcedure, router } from "../server/trpc";

export const countryOrganizationsRouter = router({
  getCountryOrganizations: publicProcedure.query(async () => {
    return getCountryOrganizations();
  }),
  getCountryOrganizationById: publicProcedure
    .input(countryOrganizationIdSchema)
    .query(async ({ input }) => {
      return getCountryOrganizationById(input.id);
    }),
  createCountryOrganization: publicProcedure
    .input(insertCountryOrganizationParams)
    .mutation(async ({ input }) => {
      return createCountryOrganization(input);
    }),
  updateCountryOrganization: publicProcedure
    .input(updateCountryOrganizationParams)
    .mutation(async ({ input }) => {
      return updateCountryOrganization(input.id, input);
    }),
  deleteCountryOrganization: publicProcedure
    .input(countryOrganizationIdSchema)
    .mutation(async ({ input }) => {
      return deleteCountryOrganization(input.id);
    }),
});
