import {
  createLessonOverride,
  deleteLessonOverride,
  updateLessonOverride,
} from "../api/lessonOverrides/mutations";
import {
  getLessonOverrideById,
  getLessonOverrides,
} from "../api/lessonOverrides/queries";
import {
  insertLessonOverrideParams,
  lessonOverrideIdSchema,
  updateLessonOverrideParams,
} from "../db/schema/lessonOverrides";
import { publicProcedure, router } from "../server/trpc";

export const lessonOverridesRouter = router({
  getLessonOverrides: publicProcedure.query(async () => {
    return getLessonOverrides();
  }),
  getLessonOverrideById: publicProcedure
    .input(lessonOverrideIdSchema)
    .query(async ({ input }) => {
      return getLessonOverrideById(input.id);
    }),
  createLessonOverride: publicProcedure
    .input(insertLessonOverrideParams)
    .mutation(async ({ input }) => {
      return createLessonOverride(input);
    }),
  updateLessonOverride: publicProcedure
    .input(updateLessonOverrideParams)
    .mutation(async ({ input }) => {
      return updateLessonOverride(input.id, input);
    }),
  deleteLessonOverride: publicProcedure
    .input(lessonOverrideIdSchema)
    .mutation(async ({ input }) => {
      return deleteLessonOverride(input.id);
    }),
});
