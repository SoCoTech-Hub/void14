import {
  gradeItemIdSchema,
  insertGradeItemParams,
  updateGradeItemParams,
} from "@soco/grade-db/schema/gradeItems";

import {
  createGradeItem,
  deleteGradeItem,
  updateGradeItem,
} from "../api/gradeItems/mutations";
import { getGradeItemById, getGradeItems } from "../api/gradeItems/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const gradeItemsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getGradeItems: publicProcedure.query(async () => {
      return getGradeItems();
    }),
    getGradeItemById: publicProcedure
      .input(gradeItemIdSchema)
      .query(async ({ input }) => {
        return getGradeItemById(input.id);
      }),
    createGradeItem: publicProcedure
      .input(insertGradeItemParams)
      .mutation(async ({ input }) => {
        return createGradeItem(input);
      }),
    updateGradeItem: publicProcedure
      .input(updateGradeItemParams)
      .mutation(async ({ input }) => {
        return updateGradeItem(input.id, input);
      }),
    deleteGradeItem: publicProcedure
      .input(gradeItemIdSchema)
      .mutation(async ({ input }) => {
        return deleteGradeItem(input.id);
      }),
  });
