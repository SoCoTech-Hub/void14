import {
  insertRoleAssignmentParams,
  roleAssignmentIdSchema,
  updateRoleAssignmentParams,
} from "@soco/role-db/schema/roleAssignments";

import {
  createRoleAssignment,
  deleteRoleAssignment,
  updateRoleAssignment,
} from "../api/roleAssignments/mutations";
import {
  getRoleAssignmentById,
  getRoleAssignments,
} from "../api/roleAssignments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const roleAssignmentsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
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
