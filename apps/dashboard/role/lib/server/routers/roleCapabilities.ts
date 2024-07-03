import { getRoleCapabilityById, getRoleCapabilities } from "@/lib/api/roleCapabilities/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleCapabilityIdSchema,
  insertRoleCapabilityParams,
  updateRoleCapabilityParams,
} from "@/lib/db/schema/roleCapabilities";
import { createRoleCapability, deleteRoleCapability, updateRoleCapability } from "@/lib/api/roleCapabilities/mutations";

export const roleCapabilitiesRouter = router({
  getRoleCapabilities: publicProcedure.query(async () => {
    return getRoleCapabilities();
  }),
  getRoleCapabilityById: publicProcedure.input(roleCapabilityIdSchema).query(async ({ input }) => {
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
