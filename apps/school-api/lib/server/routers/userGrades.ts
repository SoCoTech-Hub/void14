import { getUserGradeById, getUserGrades } from "@/lib/api/userGrades/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  userGradeIdSchema,
  insertUserGradeParams,
  updateUserGradeParams,
} from "@/lib/db/schema/userGrades";
import { createUserGrade, deleteUserGrade, updateUserGrade } from "@/lib/api/userGrades/mutations";

export const userGradesRouter = router({
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
