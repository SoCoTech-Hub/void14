import { getLessonPageById, getLessonPages } from "@/lib/api/lessonPages/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  lessonPageIdSchema,
  insertLessonPageParams,
  updateLessonPageParams,
} from "@/lib/db/schema/lessonPages";
import { createLessonPage, deleteLessonPage, updateLessonPage } from "@/lib/api/lessonPages/mutations";

export const lessonPagesRouter = router({
  getLessonPages: publicProcedure.query(async () => {
    return getLessonPages();
  }),
  getLessonPageById: publicProcedure.input(lessonPageIdSchema).query(async ({ input }) => {
    return getLessonPageById(input.id);
  }),
  createLessonPage: publicProcedure
    .input(insertLessonPageParams)
    .mutation(async ({ input }) => {
      return createLessonPage(input);
    }),
  updateLessonPage: publicProcedure
    .input(updateLessonPageParams)
    .mutation(async ({ input }) => {
      return updateLessonPage(input.id, input);
    }),
  deleteLessonPage: publicProcedure
    .input(lessonPageIdSchema)
    .mutation(async ({ input }) => {
      return deleteLessonPage(input.id);
    }),
});
