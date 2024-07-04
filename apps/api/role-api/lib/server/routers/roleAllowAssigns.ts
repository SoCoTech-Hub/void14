import {
  createRoleAllowAssign,
  deleteRoleAllowAssign,
  updateRoleAllowAssign,
} from "../api/roleAllowAssigns/mutations";
import {
  getRoleAllowAssignById,
  getRoleAllowAssigns,
} from "../api/roleAllowAssigns/queries";
import {
  insertRoleAllowAssignParams,
  roleAllowAssignIdSchema,
  updateRoleAllowAssignParams,
} from "../db/schema/roleAllowAssigns";
import { publicProcedure, router } from "../server/trpc";

export const roleAllowAssignsRouter = router({
  getRoleAllowAssigns: publicProcedure.query(async () => {
    return getRoleAllowAssigns();
  }),
  getRoleAllowAssignById: publicProcedure
    .input(roleAllowAssignIdSchema)
    .query(async ({ input }) => {
      return getRoleAllowAssignById(input.id);
    }),
  createRoleAllowAssign: publicProcedure
    .input(insertRoleAllowAssignParams)
    .mutation(async ({ input }) => {
      return createRoleAllowAssign(input);
    }),
  updateRoleAllowAssign: publicProcedure
    .input(updateRoleAllowAssignParams)
    .mutation(async ({ input }) => {
      return updateRoleAllowAssign(input.id, input);
    }),
  deleteRoleAllowAssign: publicProcedure
    .input(roleAllowAssignIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleAllowAssign(input.id);
    }),
});
