import {
  createFavourite,
  deleteFavourite,
  updateFavourite,
} from "../api/favourites/mutations";
import { getFavouriteById, getFavourites } from "../api/favourites/queries";
import {
  favouriteIdSchema,
  insertFavouriteParams,
  updateFavouriteParams,
} from "../db/schema/favourites";
import { publicProcedure, router } from "../server/trpc";

export const favouritesRouter = router({
  getFavourites: publicProcedure.query(async () => {
    return getFavourites();
  }),
  getFavouriteById: publicProcedure
    .input(favouriteIdSchema)
    .query(async ({ input }) => {
      return getFavouriteById(input.id);
    }),
  createFavourite: publicProcedure
    .input(insertFavouriteParams)
    .mutation(async ({ input }) => {
      return createFavourite(input);
    }),
  updateFavourite: publicProcedure
    .input(updateFavouriteParams)
    .mutation(async ({ input }) => {
      return updateFavourite(input.id, input);
    }),
  deleteFavourite: publicProcedure
    .input(favouriteIdSchema)
    .mutation(async ({ input }) => {
      return deleteFavourite(input.id);
    }),
});
