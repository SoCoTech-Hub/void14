import {
  insertRoleCapabilityParams,
  roleCapabilityIdSchema,
  updateRoleCapabilityParams,
} from "@soco/role-db/schema/roleCapabilities";

import {
  createRoleCapability,
  deleteRoleCapability,
  updateRoleCapability,
} from "../api/roleCapabilities/mutations";
import {
  getRoleCapabilities,
  getRoleCapabilityById,
} from "../api/roleCapabilities/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const roleCapabilitiesRouter = createTRPCRouter({
  getRoleCapabilities: publicProcedure.query(async () => {
    return getRoleCapabilities();
  }),
  getRoleCapabilityById: publicProcedure
    .input(roleCapabilityIdSchema)
    .query(async ({ input }) => {
      return getRoleCapabilityById(input.id);
    }),
  createRoleCapability: publicProcedure
    .input(insertRoleCapabilityParams)
    .mutation(async ({ input }) => {
      return createRoleCapability(input);
    }),
  updateRoleCapability: publicProcedure
    .input(updateRoleCapabilityParams)
    .mutation(async ({ input }) => {
      return updateRoleCapability(input.id, input);
    }),
  deleteRoleCapability: publicProcedure
    .input(roleCapabilityIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleCapability(input.id);
    }),
});
