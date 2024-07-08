import { getLessonBranchById, getLessonBranches } from "../api/lessonBranches/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  lessonBranchIdSchema,
  insertLessonBranchParams,
  updateLessonBranchParams,
} from "@soco/lesson-db/schema/lessonBranches";
import { createLessonBranch, deleteLessonBranch, updateLessonBranch } from "../api/lessonBranches/mutations";

export const lessonBranchesRouter =createTRPCRouter({
  getLessonBranches: publicProcedure.query(async () => {
    return getLessonBranches();
  }),
  getLessonBranchById: publicProcedure.input(lessonBranchIdSchema).query(async ({ input }) => {
    return getLessonBranchById(input.id);
  }),
  createLessonBranch: publicProcedure
    .input(insertLessonBranchParams)
    .mutation(async ({ input }) => {
      return createLessonBranch(input);
    }),
  updateLessonBranch: publicProcedure
    .input(updateLessonBranchParams)
    .mutation(async ({ input }) => {
      return updateLessonBranch(input.id, input);
    }),
  deleteLessonBranch: publicProcedure
    .input(lessonBranchIdSchema)
    .mutation(async ({ input }) => {
      return deleteLessonBranch(input.id);
    }),
});
