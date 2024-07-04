import {
  createAssignGrade,
  deleteAssignGrade,
  updateAssignGrade,
} from "../api/assignGrades/mutations";
import {
  getAssignGradeById,
  getAssignGrades,
} from "../api/assignGrades/queries";
import {
  assignGradeIdSchema,
  insertAssignGradeParams,
  updateAssignGradeParams,
} from "../db/schema/assignGrades";
import { publicProcedure, router } from "../server/trpc";

export const assignGradesRouter = router({
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
