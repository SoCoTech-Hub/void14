import {
  createRoleAssignment,
  deleteRoleAssignment,
  updateRoleAssignment,
} from "../api/roleAssignments/mutations";
import {
  getRoleAssignmentById,
  getRoleAssignments,
} from "../api/roleAssignments/queries";
import {
  insertRoleAssignmentParams,
  roleAssignmentIdSchema,
  updateRoleAssignmentParams,
} from "../db/schema/roleAssignments";
import { publicProcedure, router } from "../server/trpc";

export const roleAssignmentsRouter = router({
  getRoleAssignments: publicProcedure.query(async () => {
    return getRoleAssignments();
  }),
  getRoleAssignmentById: publicProcedure
    .input(roleAssignmentIdSchema)
    .query(async ({ input }) => {
      return getRoleAssignmentById(input.id);
    }),
  createRoleAssignment: publicProcedure
    .input(insertRoleAssignmentParams)
    .mutation(async ({ input }) => {
      return createRoleAssignment(input);
    }),
  updateRoleAssignment: publicProcedure
    .input(updateRoleAssignmentParams)
    .mutation(async ({ input }) => {
      return updateRoleAssignment(input.id, input);
    }),
  deleteRoleAssignment: publicProcedure
    .input(roleAssignmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteRoleAssignment(input.id);
    }),
});
