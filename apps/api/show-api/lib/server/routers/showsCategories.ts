import {
  createShowsCategory,
  deleteShowsCategory,
  updateShowsCategory,
} from "../api/showsCategories/mutations";
import {
  getShowsCategories,
  getShowsCategoryById,
} from "../api/showsCategories/queries";
import {
  insertShowsCategoryParams,
  showsCategoryIdSchema,
  updateShowsCategoryParams,
} from "../db/schema/showsCategories";
import { publicProcedure, router } from "../server/trpc";

export const showsCategoriesRouter = router({
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
