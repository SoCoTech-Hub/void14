import { getAssignGradeById, getAssignGrades } from "@/lib/api/assignGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  assignGradeIdSchema,
  insertAssignGradeParams,
  updateAssignGradeParams,
} from "@/lib/db/schema/assignGrades";
import { createAssignGrade, deleteAssignGrade, updateAssignGrade } from "@/lib/api/assignGrades/mutations";

export const assignGradesRouter = router({
  getAssignGrades: publicProcedure.query(async () => {
    return getAssignGrades();
  }),
  getAssignGradeById: publicProcedure.input(assignGradeIdSchema).query(async ({ input }) => {
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
