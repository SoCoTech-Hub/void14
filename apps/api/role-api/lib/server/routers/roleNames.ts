import {
  createRoleName,
  deleteRoleName,
  updateRoleName,
} from "../api/roleNames/mutations";
import { getRoleNameById, getRoleNames } from "../api/roleNames/queries";
import {
  insertRoleNameParams,
  roleNameIdSchema,
  updateRoleNameParams,
} from "../db/schema/roleNames";
import { publicProcedure, router } from "../server/trpc";

export const roleNamesRouter = router({
  getRoleNames: publicProcedure.query(async () => {
    return getRoleNames();
  }),
  getRoleNameById: publicProcedure
    .input(roleNameIdSchema)
    .query(async ({ input }) => {
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
