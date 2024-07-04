import {
  createProvinceOrganization,
  deleteProvinceOrganization,
  updateProvinceOrganization,
} from "../api/provinceOrganizations/mutations";
import {
  getProvinceOrganizationById,
  getProvinceOrganizations,
} from "../api/provinceOrganizations/queries";
import {
  insertProvinceOrganizationParams,
  provinceOrganizationIdSchema,
  updateProvinceOrganizationParams,
} from "../db/schema/provinceOrganizations";
import { publicProcedure, router } from "../server/trpc";

export const provinceOrganizationsRouter = router({
  getProvinceOrganizations: publicProcedure.query(async () => {
    return getProvinceOrganizations();
  }),
  getProvinceOrganizationById: publicProcedure
    .input(provinceOrganizationIdSchema)
    .query(async ({ input }) => {
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
