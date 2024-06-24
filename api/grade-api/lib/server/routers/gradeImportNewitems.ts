import { getGradeImportNewitemById, getGradeImportNewitems } from "@/lib/api/gradeImportNewitems/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeImportNewitemIdSchema,
  insertGradeImportNewitemParams,
  updateGradeImportNewitemParams,
} from "@/lib/db/schema/gradeImportNewitems";
import { createGradeImportNewitem, deleteGradeImportNewitem, updateGradeImportNewitem } from "@/lib/api/gradeImportNewitems/mutations";

export const gradeImportNewitemsRouter = router({
  getGradeImportNewitems: publicProcedure.query(async () => {
    return getGradeImportNewitems();
  }),
  getGradeImportNewitemById: publicProcedure.input(gradeImportNewitemIdSchema).query(async ({ input }) => {
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
