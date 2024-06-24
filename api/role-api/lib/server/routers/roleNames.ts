import { getRoleNameById, getRoleNames } from "@/lib/api/roleNames/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleNameIdSchema,
  insertRoleNameParams,
  updateRoleNameParams,
} from "@/lib/db/schema/roleNames";
import { createRoleName, deleteRoleName, updateRoleName } from "@/lib/api/roleNames/mutations";

export const roleNamesRouter = router({
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
