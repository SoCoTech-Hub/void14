import {
  insertShowsCategoryParams,
  showsCategoryIdSchema,
  updateShowsCategoryParams,
} from "@soco/show-db/schema/showsCategories";

import {
  createShowsCategory,
  deleteShowsCategory,
  updateShowsCategory,
} from "../api/showsCategories/mutations";
import {
  getShowsCategories,
  getShowsCategoryById,
} from "../api/showsCategories/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const showsCategoriesRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getShowsCategories: publicProcedure.query(async () => {
      return getShowsCategories();
    }),
    getShowsCategoryById: publicProcedure
      .input(showsCategoryIdSchema)
      .query(async ({ input }) => {
        return getShowsCategoryById(input.id);
      }),
    createShowsCategory: publicProcedure
      .input(insertShowsCategoryParams)
      .mutation(async ({ input }) => {
        return createShowsCategory(input);
      }),
    updateShowsCategory: publicProcedure
      .input(updateShowsCategoryParams)
      .mutation(async ({ input }) => {
        return updateShowsCategory(input.id, input);
      }),
    deleteShowsCategory: publicProcedure
      .input(showsCategoryIdSchema)
      .mutation(async ({ input }) => {
        return deleteShowsCategory(input.id);
      }),
  });
