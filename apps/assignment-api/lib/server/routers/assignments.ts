import { getAssignmentById, getAssignments } from "@/lib/api/assignments/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignmentIdSchema,
  insertAssignmentParams,
  updateAssignmentParams,
} from "@/lib/db/schema/assignments";
import { createAssignment, deleteAssignment, updateAssignment } from "@/lib/api/assignments/mutations";

export const assignmentsRouter = router({
  getAssignments: publicProcedure.query(async () => {
    return getAssignments();
  }),
  getAssignmentById: publicProcedure.input(assignmentIdSchema).query(async ({ input }) => {
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
