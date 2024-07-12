import {
  gradeImportValueIdSchema,
  insertGradeImportValueParams,
  updateGradeImportValueParams,
} from "@soco/grade-db/schema/gradeImportValues";

import {
  createGradeImportValue,
  deleteGradeImportValue,
  updateGradeImportValue,
} from "../api/gradeImportValues/mutations";
import {
  getGradeImportValueById,
  getGradeImportValues,
} from "../api/gradeImportValues/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeImportValuesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradeImportValues: publicProcedure.query(async () => {
      return getGradeImportValues();
    }),
    getGradeImportValueById: publicProcedure
      .input(gradeImportValueIdSchema)
      .query(async ({ input }) => {
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
