import {
  createGradeItem,
  deleteGradeItem,
  updateGradeItem,
} from "../api/gradeItems/mutations";
import { getGradeItemById, getGradeItems } from "../api/gradeItems/queries";
import {
  gradeItemIdSchema,
  insertGradeItemParams,
  updateGradeItemParams,
} from "../db/schema/gradeItems";
import { publicProcedure, router } from "../server/trpc";

export const gradeItemsRouter = router({
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
