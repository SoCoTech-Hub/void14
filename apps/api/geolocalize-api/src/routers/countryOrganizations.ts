import { getCountryOrganizationById, getCountryOrganizations } from "../api/countryOrganizations/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  countryOrganizationIdSchema,
  insertCountryOrganizationParams,
  updateCountryOrganizationParams,
} from "@soco/geolocalize-db/schema/countryOrganizations";
import { createCountryOrganization, deleteCountryOrganization, updateCountryOrganization } from "../api/countryOrganizations/mutations";

export const countryOrganizationsRouter =createTRPCRouter({
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
