import { getForumGradeById, getForumGrades } from "../api/forumGrades/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  forumGradeIdSchema,
  insertForumGradeParams,
  updateForumGradeParams,
} from "@soco/forum-db/schema/forumGrades";
import { createForumGrade, deleteForumGrade, updateForumGrade } from "../api/forumGrades/mutations";

export const forumGradesRouter =createTRPCRouter({
  getForumGrades: publicProcedure.query(async () => {
    return getForumGrades();
  }),
  getForumGradeById: publicProcedure.input(forumGradeIdSchema).query(async ({ input }) => {
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
