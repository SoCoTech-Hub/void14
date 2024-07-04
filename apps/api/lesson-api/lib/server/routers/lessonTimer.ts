import {
  createLessonTimer,
  deleteLessonTimer,
  updateLessonTimer,
} from "../api/lessonTimer/mutations";
import { getLessonTimer, getLessonTimerById } from "../api/lessonTimer/queries";
import {
  insertLessonTimerParams,
  lessonTimerIdSchema,
  updateLessonTimerParams,
} from "../db/schema/lessonTimer";
import { publicProcedure, router } from "../server/trpc";

export const lessonTimerRouter = router({
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
