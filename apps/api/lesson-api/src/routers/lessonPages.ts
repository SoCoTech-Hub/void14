import {
  insertLessonPageParams,
  lessonPageIdSchema,
  updateLessonPageParams,
} from "@soco/lesson-db/schema/lessonPages";

import {
  createLessonPage,
  deleteLessonPage,
  updateLessonPage,
} from "../api/lessonPages/mutations";
import { getLessonPageById, getLessonPages } from "../api/lessonPages/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const lessonPagesRouter = createTRPCRouter({
  getLessonPages: publicProcedure.query(async () => {
    return getLessonPages();
  }),
  getLessonPageById: publicProcedure
    .input(lessonPageIdSchema)
    .query(async ({ input }) => {
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
