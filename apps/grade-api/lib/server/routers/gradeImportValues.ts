import { getGradeImportValueById, getGradeImportValues } from "@/lib/api/gradeImportValues/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeImportValueIdSchema,
  insertGradeImportValueParams,
  updateGradeImportValueParams,
} from "@/lib/db/schema/gradeImportValues";
import { createGradeImportValue, deleteGradeImportValue, updateGradeImportValue } from "@/lib/api/gradeImportValues/mutations";

export const gradeImportValuesRouter = router({
  getGradeImportValues: publicProcedure.query(async () => {
    return getGradeImportValues();
  }),
  getGradeImportValueById: publicProcedure.input(gradeImportValueIdSchema).query(async ({ input }) => {
    return getGradeImportValueById(input.id);
  }),
  createGradeImportValue: publicProcedure
    .input(insertGradeImportValueParams)
    .mutation(async ({ input }) => {
      return createGradeImportValue(input);
    }),
  updateGradeImportValue: publicProcedure
    .input(updateGradeImportValueParams)
    .mutation(async ({ input }) => {
      return updateGradeImportValue(input.id, input);
    }),
  deleteGradeImportValue: publicProcedure
    .input(gradeImportValueIdSchema)
    .mutation(async ({ input }) => {
      return deleteGradeImportValue(input.id);
    }),
});
