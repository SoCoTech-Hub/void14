import { getLessonOverrideById, getLessonOverrides } from "../api/lessonOverrides/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  lessonOverrideIdSchema,
  insertLessonOverrideParams,
  updateLessonOverrideParams,
} from "@soco/lesson-db/schema/lessonOverrides";
import { createLessonOverride, deleteLessonOverride, updateLessonOverride } from "../api/lessonOverrides/mutations";

export const lessonOverridesRouter =createTRPCRouter({
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
