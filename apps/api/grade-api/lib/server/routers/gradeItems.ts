import { getGradeItemById, getGradeItems } from "@/lib/api/gradeItems/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  gradeItemIdSchema,
  insertGradeItemParams,
  updateGradeItemParams,
} from "@/lib/db/schema/gradeItems";
import { createGradeItem, deleteGradeItem, updateGradeItem } from "@/lib/api/gradeItems/mutations";

export const gradeItemsRouter = router({
  getGradeItems: publicProcedure.query(async () => {
    return getGradeItems();
  }),
  getGradeItemById: publicProcedure.input(gradeItemIdSchema).query(async ({ input }) => {
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
