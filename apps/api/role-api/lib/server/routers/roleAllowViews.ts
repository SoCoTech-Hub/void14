import { getRoleAllowViewById, getRoleAllowViews } from "@/lib/api/roleAllowViews/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  roleAllowViewIdSchema,
  insertRoleAllowViewParams,
  updateRoleAllowViewParams,
} from "@/lib/db/schema/roleAllowViews";
import { createRoleAllowView, deleteRoleAllowView, updateRoleAllowView } from "@/lib/api/roleAllowViews/mutations";

export const roleAllowViewsRouter = router({
  getRoleAllowViews: publicProcedure.query(async () => {
    return getRoleAllowViews();
  }),
  getRoleAllowViewById: publicProcedure.input(roleAllowViewIdSchema).query(async ({ input }) => {
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
