import {
  createToolDataprivacyPurposeRole,
  deleteToolDataprivacyPurposeRole,
  updateToolDataprivacyPurposeRole,
} from "../api/toolDataprivacyPurposeRoles/mutations";
import {
  getToolDataprivacyPurposeRoleById,
  getToolDataprivacyPurposeRoles,
} from "../api/toolDataprivacyPurposeRoles/queries";
import {
  insertToolDataprivacyPurposeRoleParams,
  toolDataprivacyPurposeRoleIdSchema,
  updateToolDataprivacyPurposeRoleParams,
} from "../db/schema/toolDataprivacyPurposeRoles";
import { publicProcedure, router } from "../server/trpc";

export const toolDataprivacyPurposeRolesRouter = router({
  getToolDataprivacyPurposeRoles: publicProcedure.query(async () => {
    return getToolDataprivacyPurposeRoles();
  }),
  getToolDataprivacyPurposeRoleById: publicProcedure
    .input(toolDataprivacyPurposeRoleIdSchema)
    .query(async ({ input }) => {
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
