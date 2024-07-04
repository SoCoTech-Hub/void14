import {
  createDistrictOrganization,
  deleteDistrictOrganization,
  updateDistrictOrganization,
} from "../api/districtOrganizations/mutations";
import {
  getDistrictOrganizationById,
  getDistrictOrganizations,
} from "../api/districtOrganizations/queries";
import {
  districtOrganizationIdSchema,
  insertDistrictOrganizationParams,
  updateDistrictOrganizationParams,
} from "../db/schema/districtOrganizations";
import { publicProcedure, router } from "../server/trpc";

export const districtOrganizationsRouter = router({
  getDistrictOrganizations: publicProcedure.query(async () => {
    return getDistrictOrganizations();
  }),
  getDistrictOrganizationById: publicProcedure
    .input(districtOrganizationIdSchema)
    .query(async ({ input }) => {
      return getDistrictOrganizationById(input.id);
    }),
  createDistrictOrganization: publicProcedure
    .input(insertDistrictOrganizationParams)
    .mutation(async ({ input }) => {
      return createDistrictOrganization(input);
    }),
  updateDistrictOrganization: publicProcedure
    .input(updateDistrictOrganizationParams)
    .mutation(async ({ input }) => {
      return updateDistrictOrganization(input.id, input);
    }),
  deleteDistrictOrganization: publicProcedure
    .input(districtOrganizationIdSchema)
    .mutation(async ({ input }) => {
      return deleteDistrictOrganization(input.id);
    }),
});
