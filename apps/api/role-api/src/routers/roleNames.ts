import { getRoleNameById, getRoleNames } from "../api/roleNames/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  roleNameIdSchema,
  insertRoleNameParams,
  updateRoleNameParams,
} from "@soco/role-db/schema/roleNames";
import { createRoleName, deleteRoleName, updateRoleName } from "../api/roleNames/mutations";

export const roleNamesRouter =createTRPCRouter({
  getRoleNames: publicProcedure.query(async () => {
    return getRoleNames();
  }),
  getRoleNameById: publicProcedure.input(roleNameIdSchema).query(async ({ input }) => {
    return getRoleNameById(input.id);
  }),
  createRoleName: publicProcedure
    .input(insertRoleNameParams)
    .mutation(async ({ input }) => {
      return createRoleName(input);
    }),
  updateRoleName: publicProcedure
    .input(updateRoleNameParams)
    .mutation(async ({ input }) => {
      return updateRoleName(input.id, input);
    }),
  deleteRoleName: publicProcedure
    .input(roleNameIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleName(input.id);
    }),
});
