import {
  insertLessonTimerParams,
  lessonTimerIdSchema,
  updateLessonTimerParams,
} from "@soco/lesson-db/schema/lessonTimer";

import {
  createLessonTimer,
  deleteLessonTimer,
  updateLessonTimer,
} from "../api/lessonTimer/mutations";
import { getLessonTimer, getLessonTimerById } from "../api/lessonTimer/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lessonTimerRouter = createTRPCRouter({
  getLessonTimer: publicProcedure.query(async () => {
    return getLessonTimer();
  }),
  getLessonTimerById: publicProcedure
    .input(lessonTimerIdSchema)
    .query(async ({ input }) => {
      return getLessonTimerById(input.id);
    }),
  createLessonTimer: publicProcedure
    .input(insertLessonTimerParams)
    .mutation(async ({ input }) => {
      return createLessonTimer(input);
    }),
  updateLessonTimer: publicProcedure
    .input(updateLessonTimerParams)
    .mutation(async ({ input }) => {
      return updateLessonTimer(input.id, input);
    }),
  deleteLessonTimer: publicProcedure
    .input(lessonTimerIdSchema)
    .mutation(async ({ input }) => {
      return deleteLessonTimer(input.id);
    }),
});
