import { getGlossaryEntriesCategoryById, getGlossaryEntriesCategories } from "@/lib/api/glossaryEntriesCategories/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  glossaryEntriesCategoryIdSchema,
  insertGlossaryEntriesCategoryParams,
  updateGlossaryEntriesCategoryParams,
} from "@/lib/db/schema/glossaryEntriesCategories";
import { createGlossaryEntriesCategory, deleteGlossaryEntriesCategory, updateGlossaryEntriesCategory } from "@/lib/api/glossaryEntriesCategories/mutations";

export const glossaryEntriesCategoriesRouter = router({
  getGlossaryEntriesCategories: publicProcedure.query(async () => {
    return getGlossaryEntriesCategories();
  }),
  getGlossaryEntriesCategoryById: publicProcedure.input(glossaryEntriesCategoryIdSchema).query(async ({ input }) => {
    return getGlossaryEntriesCategoryById(input.id);
  }),
  createGlossaryEntriesCategory: publicProcedure
    .input(insertGlossaryEntriesCategoryParams)
    .mutation(async ({ input }) => {
      return createGlossaryEntriesCategory(input);
    }),
  updateGlossaryEntriesCategory: publicProcedure
    .input(updateGlossaryEntriesCategoryParams)
    .mutation(async ({ input }) => {
      return updateGlossaryEntriesCategory(input.id, input);
    }),
  deleteGlossaryEntriesCategory: publicProcedure
    .input(glossaryEntriesCategoryIdSchema)
    .mutation(async ({ input }) => {
      return deleteGlossaryEntriesCategory(input.id);
    }),
});
