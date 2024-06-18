import { getLessonOverrideById, getLessonOverrides } from "@/lib/api/lessonOverrides/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonOverrideIdSchema,
  insertLessonOverrideParams,
  updateLessonOverrideParams,
} from "@/lib/db/schema/lessonOverrides";
import { createLessonOverride, deleteLessonOverride, updateLessonOverride } from "@/lib/api/lessonOverrides/mutations";

export const lessonOverridesRouter = router({
  getLessonOverrides: publicProcedure.query(async () => {
    return getLessonOverrides();
  }),
  getLessonOverrideById: publicProcedure.input(lessonOverrideIdSchema).query(async ({ input }) => {
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
