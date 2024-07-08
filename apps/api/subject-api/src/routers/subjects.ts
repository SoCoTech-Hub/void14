import { getSubjectById, getSubjects } from "../api/subjects/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  subjectIdSchema,
  insertSubjectParams,
  updateSubjectParams,
} from "@soco/subject-db/schema/subjects";
import { createSubject, deleteSubject, updateSubject } from "../api/subjects/mutations";

export const subjectsRouter =createTRPCRouter({
  getSubjects: publicProcedure.query(async () => {
    return getSubjects();
  }),
  getSubjectById: publicProcedure.input(subjectIdSchema).query(async ({ input }) => {
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
