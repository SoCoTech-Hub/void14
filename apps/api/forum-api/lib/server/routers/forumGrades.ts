import {
  createForumGrade,
  deleteForumGrade,
  updateForumGrade,
} from "../api/forumGrades/mutations";
import { getForumGradeById, getForumGrades } from "../api/forumGrades/queries";
import {
  forumGradeIdSchema,
  insertForumGradeParams,
  updateForumGradeParams,
} from "../db/schema/forumGrades";
import { publicProcedure, router } from "../server/trpc";

export const forumGradesRouter = router({
  getForumGrades: publicProcedure.query(async () => {
    return getForumGrades();
  }),
  getForumGradeById: publicProcedure
    .input(forumGradeIdSchema)
    .query(async ({ input }) => {
      return getForumGradeById(input.id);
    }),
  createForumGrade: publicProcedure
    .input(insertForumGradeParams)
    .mutation(async ({ input }) => {
      return createForumGrade(input);
    }),
  updateForumGrade: publicProcedure
    .input(updateForumGradeParams)
    .mutation(async ({ input }) => {
      return updateForumGrade(input.id, input);
    }),
  deleteForumGrade: publicProcedure
    .input(forumGradeIdSchema)
    .mutation(async ({ input }) => {
      return deleteForumGrade(input.id);
    }),
});
