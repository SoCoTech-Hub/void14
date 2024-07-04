import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "../api/subjects/mutations";
import { getSubjectById, getSubjects } from "../api/subjects/queries";
import {
  insertSubjectParams,
  subjectIdSchema,
  updateSubjectParams,
} from "../db/schema/subjects";
import { publicProcedure, router } from "../server/trpc";

export const subjectsRouter = router({
  getSubjects: publicProcedure.query(async () => {
    return getSubjects();
  }),
  getSubjectById: publicProcedure
    .input(subjectIdSchema)
    .query(async ({ input }) => {
      return getSubjectById(input.id);
    }),
  createSubject: publicProcedure
    .input(insertSubjectParams)
    .mutation(async ({ input }) => {
      return createSubject(input);
    }),
  updateSubject: publicProcedure
    .input(updateSubjectParams)
    .mutation(async ({ input }) => {
      return updateSubject(input.id, input);
    }),
  deleteSubject: publicProcedure
    .input(subjectIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubject(input.id);
    }),
});
