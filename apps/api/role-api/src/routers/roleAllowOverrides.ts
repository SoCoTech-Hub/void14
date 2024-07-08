import { getRoleAllowOverrideById, getRoleAllowOverrides } from "../api/roleAllowOverrides/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  roleAllowOverrideIdSchema,
  insertRoleAllowOverrideParams,
  updateRoleAllowOverrideParams,
} from "@soco/role-db/schema/roleAllowOverrides";
import { createRoleAllowOverride, deleteRoleAllowOverride, updateRoleAllowOverride } from "../api/roleAllowOverrides/mutations";

export const roleAllowOverridesRouter =createTRPCRouter({
  getRoleAllowOverrides: publicProcedure.query(async () => {
    return getRoleAllowOverrides();
  }),
  getRoleAllowOverrideById: publicProcedure.input(roleAllowOverrideIdSchema).query(async ({ input }) => {
    return getRoleAllowOverrideById(input.id);
  }),
  createRoleAllowOverride: publicProcedure
    .input(insertRoleAllowOverrideParams)
    .mutation(async ({ input }) => {
      return createRoleAllowOverride(input);
    }),
  updateRoleAllowOverride: publicProcedure
    .input(updateRoleAllowOverrideParams)
    .mutation(async ({ input }) => {
      return updateRoleAllowOverride(input.id, input);
    }),
  deleteRoleAllowOverride: publicProcedure
    .input(roleAllowOverrideIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleAllowOverride(input.id);
    }),
});
