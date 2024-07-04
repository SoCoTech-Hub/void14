import {
  createRoleAllowView,
  deleteRoleAllowView,
  updateRoleAllowView,
} from "../api/roleAllowViews/mutations";
import {
  getRoleAllowViewById,
  getRoleAllowViews,
} from "../api/roleAllowViews/queries";
import {
  insertRoleAllowViewParams,
  roleAllowViewIdSchema,
  updateRoleAllowViewParams,
} from "../db/schema/roleAllowViews";
import { publicProcedure, router } from "../server/trpc";

export const roleAllowViewsRouter = router({
  getRoleAllowViews: publicProcedure.query(async () => {
    return getRoleAllowViews();
  }),
  getRoleAllowViewById: publicProcedure
    .input(roleAllowViewIdSchema)
    .query(async ({ input }) => {
      return getRoleAllowViewById(input.id);
    }),
  createRoleAllowView: publicProcedure
    .input(insertRoleAllowViewParams)
    .mutation(async ({ input }) => {
      return createRoleAllowView(input);
    }),
  updateRoleAllowView: publicProcedure
    .input(updateRoleAllowViewParams)
    .mutation(async ({ input }) => {
      return updateRoleAllowView(input.id, input);
    }),
  deleteRoleAllowView: publicProcedure
    .input(roleAllowViewIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleAllowView(input.id);
    }),
});
