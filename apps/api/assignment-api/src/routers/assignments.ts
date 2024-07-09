import {
  assignmentIdSchema,
  insertAssignmentParams,
  updateAssignmentParams,
} from "@soco/assignment-db/schema/assignments";

import {
  createAssignment,
  deleteAssignment,
  updateAssignment,
} from "../api/assignments/mutations";
import { getAssignmentById, getAssignments } from "../api/assignments/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignmentsRouter = createTRPCRouter({
  getAssignments: publicProcedure.query(async () => {
    return getAssignments();
  }),
  getAssignmentById: publicProcedure
    .input(assignmentIdSchema)
    .query(async ({ input }) => {
      return getAssignmentById(input.id);
    }),
  createAssignment: publicProcedure
    .input(insertAssignmentParams)
    .mutation(async ({ input }) => {
      return createAssignment(input);
    }),
  updateAssignment: publicProcedure
    .input(updateAssignmentParams)
    .mutation(async ({ input }) => {
      return updateAssignment(input.id, input);
    }),
  deleteAssignment: publicProcedure
    .input(assignmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteAssignment(input.id);
    }),
});
