import { getRoleAllowAssignById, getRoleAllowAssigns } from "@/lib/api/roleAllowAssigns/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleAllowAssignIdSchema,
  insertRoleAllowAssignParams,
  updateRoleAllowAssignParams,
} from "@/lib/db/schema/roleAllowAssigns";
import { createRoleAllowAssign, deleteRoleAllowAssign, updateRoleAllowAssign } from "@/lib/api/roleAllowAssigns/mutations";

export const roleAllowAssignsRouter = router({
  getRoleAllowAssigns: publicProcedure.query(async () => {
    return getRoleAllowAssigns();
  }),
  getRoleAllowAssignById: publicProcedure.input(roleAllowAssignIdSchema).query(async ({ input }) => {
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
