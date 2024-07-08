import { getToolCohortRoleById, getToolCohortRoles } from "../api/toolCohortRoles/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  toolCohortRoleIdSchema,
  insertToolCohortRoleParams,
  updateToolCohortRoleParams,
} from "@soco/tool-brickfield-db/schema/toolCohortRoles";
import { createToolCohortRole, deleteToolCohortRole, updateToolCohortRole } from "../api/toolCohortRoles/mutations";

export const toolCohortRolesRouter =createTRPCRouter({
  getToolCohortRoles: publicProcedure.query(async () => {
    return getToolCohortRoles();
  }),
  getToolCohortRoleById: publicProcedure.input(toolCohortRoleIdSchema).query(async ({ input }) => {
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
