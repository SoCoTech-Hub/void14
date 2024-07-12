import {
  insertRoleAllowViewParams,
  roleAllowViewIdSchema,
  updateRoleAllowViewParams,
} from "@soco/role-db/schema/roleAllowViews";

import {
  createRoleAllowView,
  deleteRoleAllowView,
  updateRoleAllowView,
} from "../api/roleAllowViews/mutations";
import {
  getRoleAllowViewById,
  getRoleAllowViews,
} from "../api/roleAllowViews/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const roleAllowViewsRouter = createTRPCRouter({
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
