import {
  createLessonBranch,
  deleteLessonBranch,
  updateLessonBranch,
} from "../api/lessonBranches/mutations";
import {
  getLessonBranchById,
  getLessonBranches,
} from "../api/lessonBranches/queries";
import {
  insertLessonBranchParams,
  lessonBranchIdSchema,
  updateLessonBranchParams,
} from "../db/schema/lessonBranches";
import { publicProcedure, router } from "../server/trpc";

export const lessonBranchesRouter = router({
  getLessonBranches: publicProcedure.query(async () => {
    return getLessonBranches();
  }),
  getLessonBranchById: publicProcedure
    .input(lessonBranchIdSchema)
    .query(async ({ input }) => {
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
