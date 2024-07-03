import { getRoleById, getRoles } from "@/lib/api/roles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleIdSchema,
  insertRoleParams,
  updateRoleParams,
} from "@/lib/db/schema/roles";
import { createRole, deleteRole, updateRole } from "@/lib/api/roles/mutations";

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
