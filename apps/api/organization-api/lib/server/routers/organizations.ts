import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "../api/organizations/mutations";
import {
  getOrganizationById,
  getOrganizations,
} from "../api/organizations/queries";
import {
  insertOrganizationParams,
  organizationIdSchema,
  updateOrganizationParams,
} from "../db/schema/organizations";
import { publicProcedure, router } from "../server/trpc";

export const organizationsRouter = router({
  getOrganizations: publicProcedure.query(async () => {
    return getOrganizations();
  }),
  getOrganizationById: publicProcedure
    .input(organizationIdSchema)
    .query(async ({ input }) => {
      return getOrganizationById(input.id);
    }),
  createOrganization: publicProcedure
    .input(insertOrganizationParams)
    .mutation(async ({ input }) => {
      return createOrganization(input);
    }),
  updateOrganization: publicProcedure
    .input(updateOrganizationParams)
    .mutation(async ({ input }) => {
      return updateOrganization(input.id, input);
    }),
  deleteOrganization: publicProcedure
    .input(organizationIdSchema)
    .mutation(async ({ input }) => {
      return deleteOrganization(input.id);
    }),
});
