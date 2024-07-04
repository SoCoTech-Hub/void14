import {
  createGlossaryCategory,
  deleteGlossaryCategory,
  updateGlossaryCategory,
} from "../api/glossaryCategories/mutations";
import {
  getGlossaryCategories,
  getGlossaryCategoryById,
} from "../api/glossaryCategories/queries";
import {
  glossaryCategoryIdSchema,
  insertGlossaryCategoryParams,
  updateGlossaryCategoryParams,
} from "../db/schema/glossaryCategories";
import { publicProcedure, router } from "../server/trpc";

export const glossaryCategoriesRouter = router({
  getGlossaryCategories: publicProcedure.query(async () => {
    return getGlossaryCategories();
  }),
  getGlossaryCategoryById: publicProcedure
    .input(glossaryCategoryIdSchema)
    .query(async ({ input }) => {
      return getGlossaryCategoryById(input.id);
    }),
  createGlossaryCategory: publicProcedure
    .input(insertGlossaryCategoryParams)
    .mutation(async ({ input }) => {
      return createGlossaryCategory(input);
    }),
  updateGlossaryCategory: publicProcedure
    .input(updateGlossaryCategoryParams)
    .mutation(async ({ input }) => {
      return updateGlossaryCategory(input.id, input);
    }),
  deleteGlossaryCategory: publicProcedure
    .input(glossaryCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossaryCategory(input.id);
    }),
});
