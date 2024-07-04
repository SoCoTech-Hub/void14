import {
  createUserGrade,
  deleteUserGrade,
  updateUserGrade,
} from "../api/userGrades/mutations";
import { getUserGradeById, getUserGrades } from "../api/userGrades/queries";
import {
  insertUserGradeParams,
  updateUserGradeParams,
  userGradeIdSchema,
} from "../db/schema/userGrades";
import { publicProcedure, router } from "../server/trpc";

export const userGradesRouter = router({
  getUserGrades: publicProcedure.query(async () => {
    return getUserGrades();
  }),
  getUserGradeById: publicProcedure
    .input(userGradeIdSchema)
    .query(async ({ input }) => {
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
