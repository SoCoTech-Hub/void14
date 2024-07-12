import {
  assignGradeIdSchema,
  insertAssignGradeParams,
  updateAssignGradeParams,
} from "@soco/assignment-db/schema/assignGrades";

import {
  createAssignGrade,
  deleteAssignGrade,
  updateAssignGrade,
} from "../api/assignGrades/mutations";
import {
  getAssignGradeById,
  getAssignGrades,
} from "../api/assignGrades/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const assignGradesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getAssignGrades: publicProcedure.query(async () => {
      return getAssignGrades();
    }),
    getAssignGradeById: publicProcedure
      .input(assignGradeIdSchema)
      .query(async ({ input }) => {
        return getAssignGradeById(input.id);
      }),
    createAssignGrade: publicProcedure
      .input(insertAssignGradeParams)
      .mutation(async ({ input }) => {
        return createAssignGrade(input);
      }),
    updateAssignGrade: publicProcedure
      .input(updateAssignGradeParams)
      .mutation(async ({ input }) => {
        return updateAssignGrade(input.id, input);
      }),
    deleteAssignGrade: publicProcedure
      .input(assignGradeIdSchema)
      .mutation(async ({ input }) => {
        return deleteAssignGrade(input.id);
      }),
  });
