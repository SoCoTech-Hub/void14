import {
  glossaryEntriesCategoryIdSchema,
  insertGlossaryEntriesCategoryParams,
  updateGlossaryEntriesCategoryParams,
} from "@soco/glossary-db/schema/glossaryEntriesCategories";

import {
  createGlossaryEntriesCategory,
  deleteGlossaryEntriesCategory,
  updateGlossaryEntriesCategory,
} from "../api/glossaryEntriesCategories/mutations";
import {
  getGlossaryEntriesCategories,
  getGlossaryEntriesCategoryById,
} from "../api/glossaryEntriesCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const glossaryEntriesCategoriesRouter = createTRPCRouter({
  getGlossaryEntriesCategories: publicProcedure.query(async () => {
    return getGlossaryEntriesCategories();
  }),
  getGlossaryEntriesCategoryById: publicProcedure
    .input(glossaryEntriesCategoryIdSchema)
    .query(async ({ input }) => {
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
