import { getOrganizationById, getOrganizations } from "@/lib/api/organizations/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  organizationIdSchema,
  insertOrganizationParams,
  updateOrganizationParams,
} from "@/lib/db/schema/organizations";
import { createOrganization, deleteOrganization, updateOrganization } from "@/lib/api/organizations/mutations";

export const organizationsRouter = router({
  getOrganizations: publicProcedure.query(async () => {
    return getOrganizations();
  }),
  getOrganizationById: publicProcedure.input(organizationIdSchema).query(async ({ input }) => {
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
