import { createRole, deleteRole, updateRole } from "../api/roles/mutations";
import { getRoleById, getRoles } from "../api/roles/queries";
import {
  insertRoleParams,
  roleIdSchema,
  updateRoleParams,
} from "../db/schema/roles";
import { publicProcedure, router } from "../server/trpc";

export const rolesRouter = router({
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
