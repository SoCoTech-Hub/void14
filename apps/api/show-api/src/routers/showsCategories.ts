import { getShowsCategoryById, getShowsCategories } from "../api/showsCategories/queries";
import { publicProcedure,createTRPCRouter } from "../trpc";
import {
  showsCategoryIdSchema,
  insertShowsCategoryParams,
  updateShowsCategoryParams,
} from "@soco/show-db/schema/showsCategories";
import { createShowsCategory, deleteShowsCategory, updateShowsCategory } from "../api/showsCategories/mutations";

export const showsCategoriesRouter =createTRPCRouter({
  getShowsCategories: publicProcedure.query(async () => {
    return getShowsCategories();
  }),
  getShowsCategoryById: publicProcedure.input(showsCategoryIdSchema).query(async ({ input }) => {
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
