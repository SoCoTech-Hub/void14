import { getRoleAllowOverrideById, getRoleAllowOverrides } from "@/lib/api/roleAllowOverrides/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleAllowOverrideIdSchema,
  insertRoleAllowOverrideParams,
  updateRoleAllowOverrideParams,
} from "@/lib/db/schema/roleAllowOverrides";
import { createRoleAllowOverride, deleteRoleAllowOverride, updateRoleAllowOverride } from "@/lib/api/roleAllowOverrides/mutations";

export const roleAllowOverridesRouter = router({
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
