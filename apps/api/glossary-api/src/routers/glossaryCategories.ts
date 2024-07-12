import {
  glossaryCategoryIdSchema,
  insertGlossaryCategoryParams,
  updateGlossaryCategoryParams,
} from "@soco/glossary-db/schema/glossaryCategories";

import {
  createGlossaryCategory,
  deleteGlossaryCategory,
  updateGlossaryCategory,
} from "../api/glossaryCategories/mutations";
import {
  getGlossaryCategories,
  getGlossaryCategoryById,
} from "../api/glossaryCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const glossaryCategoriesRouter = createTRPCRouter({
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
