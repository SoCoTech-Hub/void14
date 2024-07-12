import {
  gradeImportNewitemIdSchema,
  insertGradeImportNewitemParams,
  updateGradeImportNewitemParams,
} from "@soco/grade-db/schema/gradeImportNewitems";

import {
  createGradeImportNewitem,
  deleteGradeImportNewitem,
  updateGradeImportNewitem,
} from "../api/gradeImportNewitems/mutations";
import {
  getGradeImportNewitemById,
  getGradeImportNewitems,
} from "../api/gradeImportNewitems/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeImportNewitemsRouter = createTRPCRouter({
  getGradeImportNewitems: publicProcedure.query(async () => {
    return getGradeImportNewitems();
  }),
  getGradeImportNewitemById: publicProcedure
    .input(gradeImportNewitemIdSchema)
    .query(async ({ input }) => {
      return getGradeImportNewitemById(input.id);
    }),
  createGradeImportNewitem: publicProcedure
    .input(insertGradeImportNewitemParams)
    .mutation(async ({ input }) => {
      return createGradeImportNewitem(input);
    }),
  updateGradeImportNewitem: publicProcedure
    .input(updateGradeImportNewitemParams)
    .mutation(async ({ input }) => {
      return updateGradeImportNewitem(input.id, input);
    }),
  deleteGradeImportNewitem: publicProcedure
    .input(gradeImportNewitemIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeImportNewitem(input.id);
    }),
});
