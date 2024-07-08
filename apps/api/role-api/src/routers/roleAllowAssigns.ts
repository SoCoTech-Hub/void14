import { getRoleAllowAssignById, getRoleAllowAssigns } from "../api/roleAllowAssigns/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  roleAllowAssignIdSchema,
  insertRoleAllowAssignParams,
  updateRoleAllowAssignParams,
} from "@soco/role-db/schema/roleAllowAssigns";
import { createRoleAllowAssign, deleteRoleAllowAssign, updateRoleAllowAssign } from "../api/roleAllowAssigns/mutations";

export const roleAllowAssignsRouter =createTRPCRouter({
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
