import {
  createRoleAllowOverride,
  deleteRoleAllowOverride,
  updateRoleAllowOverride,
} from "../api/roleAllowOverrides/mutations";
import {
  getRoleAllowOverrideById,
  getRoleAllowOverrides,
} from "../api/roleAllowOverrides/queries";
import {
  insertRoleAllowOverrideParams,
  roleAllowOverrideIdSchema,
  updateRoleAllowOverrideParams,
} from "../db/schema/roleAllowOverrides";
import { publicProcedure, router } from "../server/trpc";

export const roleAllowOverridesRouter = router({
  getRoleAllowOverrides: publicProcedure.query(async () => {
    return getRoleAllowOverrides();
  }),
  getRoleAllowOverrideById: publicProcedure
    .input(roleAllowOverrideIdSchema)
    .query(async ({ input }) => {
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
