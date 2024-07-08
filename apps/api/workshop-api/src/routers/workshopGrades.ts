import { getWorkshopGradeById, getWorkshopGrades } from "../api/workshopGrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  workshopGradeIdSchema,
  insertWorkshopGradeParams,
  updateWorkshopGradeParams,
} from "@soco/workshop-db/schema/workshopGrades";
import { createWorkshopGrade, deleteWorkshopGrade, updateWorkshopGrade } from "../api/workshopGrades/mutations";

export const workshopGradesRouter =createTRPCRouter({
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
