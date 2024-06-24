import { getCountryOrganizationById, getCountryOrganizations } from "@/lib/api/countryOrganizations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  countryOrganizationIdSchema,
  insertCountryOrganizationParams,
  updateCountryOrganizationParams,
} from "@/lib/db/schema/countryOrganizations";
import { createCountryOrganization, deleteCountryOrganization, updateCountryOrganization } from "@/lib/api/countryOrganizations/mutations";

export const countryOrganizationsRouter = router({
  getCountryOrganizations: publicProcedure.query(async () => {
    return getCountryOrganizations();
  }),
  getCountryOrganizationById: publicProcedure.input(countryOrganizationIdSchema).query(async ({ input }) => {
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
