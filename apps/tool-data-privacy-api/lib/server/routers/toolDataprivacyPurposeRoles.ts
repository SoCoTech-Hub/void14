import { getToolDataprivacyPurposeRoleById, getToolDataprivacyPurposeRoles } from "@/lib/api/toolDataprivacyPurposeRoles/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  toolDataprivacyPurposeRoleIdSchema,
  insertToolDataprivacyPurposeRoleParams,
  updateToolDataprivacyPurposeRoleParams,
} from "@/lib/db/schema/toolDataprivacyPurposeRoles";
import { createToolDataprivacyPurposeRole, deleteToolDataprivacyPurposeRole, updateToolDataprivacyPurposeRole } from "@/lib/api/toolDataprivacyPurposeRoles/mutations";

export const toolDataprivacyPurposeRolesRouter = router({
  getToolDataprivacyPurposeRoles: publicProcedure.query(async () => {
    return getToolDataprivacyPurposeRoles();
  }),
  getToolDataprivacyPurposeRoleById: publicProcedure.input(toolDataprivacyPurposeRoleIdSchema).query(async ({ input }) => {
    return getToolDataprivacyPurposeRoleById(input.id);
  }),
  createToolDataprivacyPurposeRole: publicProcedure
    .input(insertToolDataprivacyPurposeRoleParams)
    .mutation(async ({ input }) => {
      return createToolDataprivacyPurposeRole(input);
    }),
  updateToolDataprivacyPurposeRole: publicProcedure
    .input(updateToolDataprivacyPurposeRoleParams)
    .mutation(async ({ input }) => {
      return updateToolDataprivacyPurposeRole(input.id, input);
    }),
  deleteToolDataprivacyPurposeRole: publicProcedure
    .input(toolDataprivacyPurposeRoleIdSchema)
    .mutation(async ({ input }) => {
      return deleteToolDataprivacyPurposeRole(input.id);
    }),
});
