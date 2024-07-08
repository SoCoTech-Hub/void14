import { getProvinceOrganizationById, getProvinceOrganizations } from "../api/provinceOrganizations/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  provinceOrganizationIdSchema,
  insertProvinceOrganizationParams,
  updateProvinceOrganizationParams,
} from "@soco/geolocalize-db/schema/provinceOrganizations";
import { createProvinceOrganization, deleteProvinceOrganization, updateProvinceOrganization } from "../api/provinceOrganizations/mutations";

export const provinceOrganizationsRouter =createTRPCRouter({
  getProvinceOrganizations: publicProcedure.query(async () => {
    return getProvinceOrganizations();
  }),
  getProvinceOrganizationById: publicProcedure.input(provinceOrganizationIdSchema).query(async ({ input }) => {
    return getProvinceOrganizationById(input.id);
  }),
  createProvinceOrganization: publicProcedure
    .input(insertProvinceOrganizationParams)
    .mutation(async ({ input }) => {
      return createProvinceOrganization(input);
    }),
  updateProvinceOrganization: publicProcedure
    .input(updateProvinceOrganizationParams)
    .mutation(async ({ input }) => {
      return updateProvinceOrganization(input.id, input);
    }),
  deleteProvinceOrganization: publicProcedure
    .input(provinceOrganizationIdSchema)
    .mutation(async ({ input }) => {
      return deleteProvinceOrganization(input.id);
    }),
});
