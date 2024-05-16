import { getWorkshopGradeById, getWorkshopGrades } from "@/lib/api/workshopGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  workshopGradeIdSchema,
  insertWorkshopGradeParams,
  updateWorkshopGradeParams,
} from "@/lib/db/schema/workshopGrades";
import { createWorkshopGrade, deleteWorkshopGrade, updateWorkshopGrade } from "@/lib/api/workshopGrades/mutations";

export const workshopGradesRouter = router({
  getWorkshopGrades: publicProcedure.query(async () => {
    return getWorkshopGrades();
  }),
  getWorkshopGradeById: publicProcedure.input(workshopGradeIdSchema).query(async ({ input }) => {
    return getWorkshopGradeById(input.id);
  }),
  createWorkshopGrade: publicProcedure
    .input(insertWorkshopGradeParams)
    .mutation(async ({ input }) => {
      return createWorkshopGrade(input);
    }),
  updateWorkshopGrade: publicProcedure
    .input(updateWorkshopGradeParams)
    .mutation(async ({ input }) => {
      return updateWorkshopGrade(input.id, input);
    }),
  deleteWorkshopGrade: publicProcedure
    .input(workshopGradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteWorkshopGrade(input.id);
    }),
});
