import {
  insertRoleParams,
  roleIdSchema,
  updateRoleParams,
} from "@soco/role-db/schema/roles";

import { createRole, deleteRole, updateRole } from "../api/roles/mutations";
import { getRoleById, getRoles } from "../api/roles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const rolesRouter = createTRPCRouter({
  getRoles: publicProcedure.query(async () => {
    return getRoles();
  }),
  getRoleById: publicProcedure.input(roleIdSchema).query(async ({ input }) => {
    return getRoleById(input.id);
  }),
  createRole: publicProcedure
    .input(insertRoleParams)
    .mutation(async ({ input }) => {
      return createRole(input);
    }),
  updateRole: publicProcedure
    .input(updateRoleParams)
    .mutation(async ({ input }) => {
      return updateRole(input.id, input);
    }),
  deleteRole: publicProcedure
    .input(roleIdSchema)
    .mutation(async ({ input }) => {
      return deleteRole(input.id);
    }),
});
