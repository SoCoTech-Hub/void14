import { getLessonTimerById, getLessonTimer } from "@/lib/api/lessonTimer/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonTimerIdSchema,
  insertLessonTimerParams,
  updateLessonTimerParams,
} from "@/lib/db/schema/lessonTimer";
import { createLessonTimer, deleteLessonTimer, updateLessonTimer } from "@/lib/api/lessonTimer/mutations";

export const lessonTimerRouter = router({
  getLessonTimer: publicProcedure.query(async () => {
    return getLessonTimer();
  }),
  getLessonTimerById: publicProcedure.input(lessonTimerIdSchema).query(async ({ input }) => {
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
