import { getRoleAllowSwitchById, getRoleAllowSwitches } from "@/lib/api/roleAllowSwitches/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleAllowSwitchIdSchema,
  insertRoleAllowSwitchParams,
  updateRoleAllowSwitchParams,
} from "@/lib/db/schema/roleAllowSwitches";
import { createRoleAllowSwitch, deleteRoleAllowSwitch, updateRoleAllowSwitch } from "@/lib/api/roleAllowSwitches/mutations";

export const roleAllowSwitchesRouter = router({
  getRoleAllowSwitches: publicProcedure.query(async () => {
    return getRoleAllowSwitches();
  }),
  getRoleAllowSwitchById: publicProcedure.input(roleAllowSwitchIdSchema).query(async ({ input }) => {
    return getRoleAllowSwitchById(input.id);
  }),
  createRoleAllowSwitch: publicProcedure
    .input(insertRoleAllowSwitchParams)
    .mutation(async ({ input }) => {
      return createRoleAllowSwitch(input);
    }),
  updateRoleAllowSwitch: publicProcedure
    .input(updateRoleAllowSwitchParams)
    .mutation(async ({ input }) => {
      return updateRoleAllowSwitch(input.id, input);
    }),
  deleteRoleAllowSwitch: publicProcedure
    .input(roleAllowSwitchIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleAllowSwitch(input.id);
    }),
});
