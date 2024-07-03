import { getToolCohortRoleById, getToolCohortRoles } from "@/lib/api/toolCohortRoles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolCohortRoleIdSchema,
  insertToolCohortRoleParams,
  updateToolCohortRoleParams,
} from "@/lib/db/schema/toolCohortRoles";
import { createToolCohortRole, deleteToolCohortRole, updateToolCohortRole } from "@/lib/api/toolCohortRoles/mutations";

export const toolCohortRolesRouter = router({
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
