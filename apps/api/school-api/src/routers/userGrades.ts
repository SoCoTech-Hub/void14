import { getUserGradeById, getUserGrades } from "../api/userGrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  userGradeIdSchema,
  insertUserGradeParams,
  updateUserGradeParams,
} from "@soco/school-db/schema/userGrades";
import { createUserGrade, deleteUserGrade, updateUserGrade } from "../api/userGrades/mutations";

export const userGradesRouter =createTRPCRouter({
  getUserGrades: publicProcedure.query(async () => {
    return getUserGrades();
  }),
  getUserGradeById: publicProcedure.input(userGradeIdSchema).query(async ({ input }) => {
    return getUserGradeById(input.id);
  }),
  createUserGrade: publicProcedure
    .input(insertUserGradeParams)
    .mutation(async ({ input }) => {
      return createUserGrade(input);
    }),
  updateUserGrade: publicProcedure
    .input(updateUserGradeParams)
    .mutation(async ({ input }) => {
      return updateUserGrade(input.id, input);
    }),
  deleteUserGrade: publicProcedure
    .input(userGradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteUserGrade(input.id);
    }),
});
