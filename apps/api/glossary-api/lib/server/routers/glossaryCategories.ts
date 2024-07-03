import { getGlossaryCategoryById, getGlossaryCategories } from "@/lib/api/glossaryCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  glossaryCategoryIdSchema,
  insertGlossaryCategoryParams,
  updateGlossaryCategoryParams,
} from "@/lib/db/schema/glossaryCategories";
import { createGlossaryCategory, deleteGlossaryCategory, updateGlossaryCategory } from "@/lib/api/glossaryCategories/mutations";

export const glossaryCategoriesRouter = router({
  getGlossaryCategories: publicProcedure.query(async () => {
    return getGlossaryCategories();
  }),
  getGlossaryCategoryById: publicProcedure.input(glossaryCategoryIdSchema).query(async ({ input }) => {
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
