import { getLessonBranchById, getLessonBranches } from "@/lib/api/lessonBranches/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonBranchIdSchema,
  insertLessonBranchParams,
  updateLessonBranchParams,
} from "@/lib/db/schema/lessonBranches";
import { createLessonBranch, deleteLessonBranch, updateLessonBranch } from "@/lib/api/lessonBranches/mutations";

export const lessonBranchesRouter = router({
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
