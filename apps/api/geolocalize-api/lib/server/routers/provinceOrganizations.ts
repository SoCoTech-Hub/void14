import { getProvinceOrganizationById, getProvinceOrganizations } from "@/lib/api/provinceOrganizations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  provinceOrganizationIdSchema,
  insertProvinceOrganizationParams,
  updateProvinceOrganizationParams,
} from "@/lib/db/schema/provinceOrganizations";
import { createProvinceOrganization, deleteProvinceOrganization, updateProvinceOrganization } from "@/lib/api/provinceOrganizations/mutations";

export const provinceOrganizationsRouter = router({
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
