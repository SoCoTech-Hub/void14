import {
  createRoleAllowSwitch,
  deleteRoleAllowSwitch,
  updateRoleAllowSwitch,
} from "../api/roleAllowSwitches/mutations";
import {
  getRoleAllowSwitchById,
  getRoleAllowSwitches,
} from "../api/roleAllowSwitches/queries";
import {
  insertRoleAllowSwitchParams,
  roleAllowSwitchIdSchema,
  updateRoleAllowSwitchParams,
} from "../db/schema/roleAllowSwitches";
import { publicProcedure, router } from "../server/trpc";

export const roleAllowSwitchesRouter = router({
  getRoleAllowSwitches: publicProcedure.query(async () => {
    return getRoleAllowSwitches();
  }),
  getRoleAllowSwitchById: publicProcedure
    .input(roleAllowSwitchIdSchema)
    .query(async ({ input }) => {
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
