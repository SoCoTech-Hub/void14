import {
  insertToolCohortRoleParams,
  toolCohortRoleIdSchema,
  updateToolCohortRoleParams,
} from "@soco/tool-cohort-db/schema/toolCohortRoles";

import {
  createToolCohortRole,
  deleteToolCohortRole,
  updateToolCohortRole,
} from "../api/toolCohortRoles/mutations";
import {
  getToolCohortRoleById,
  getToolCohortRoles,
} from "../api/toolCohortRoles/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const toolCohortRolesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getToolCohortRoles: publicProcedure.query(async () => {
      return getToolCohortRoles();
    }),
    getToolCohortRoleById: publicProcedure
      .input(toolCohortRoleIdSchema)
      .query(async ({ input }) => {
        return getToolCohortRoleById(input.id);
      }),
    createToolCohortRole: publicProcedure
      .input(insertToolCohortRoleParams)
      .mutation(async ({ input }) => {
        return createToolCohortRole(input);
      }),
    updateToolCohortRole: publicProcedure
      .input(updateToolCohortRoleParams)
      .mutation(async ({ input }) => {
        return updateToolCohortRole(input.id, input);
      }),
    deleteToolCohortRole: publicProcedure
      .input(toolCohortRoleIdSchema)
      .mutation(async ({ input }) => {
        return deleteToolCohortRole(input.id);
      }),
  });
