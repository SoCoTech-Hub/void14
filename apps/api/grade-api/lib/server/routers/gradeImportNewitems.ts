import {
  createGradeImportNewitem,
  deleteGradeImportNewitem,
  updateGradeImportNewitem,
} from "../api/gradeImportNewitems/mutations";
import {
  getGradeImportNewitemById,
  getGradeImportNewitems,
} from "../api/gradeImportNewitems/queries";
import {
  gradeImportNewitemIdSchema,
  insertGradeImportNewitemParams,
  updateGradeImportNewitemParams,
} from "../db/schema/gradeImportNewitems";
import { publicProcedure, router } from "../server/trpc";

export const gradeImportNewitemsRouter = router({
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
