import { getFavouriteById, getFavourites } from "@/lib/api/favourites/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  favouriteIdSchema,
  insertFavouriteParams,
  updateFavouriteParams,
} from "@/lib/db/schema/favourites";
import { createFavourite, deleteFavourite, updateFavourite } from "@/lib/api/favourites/mutations";

export const favouritesRouter = router({
  getFavourites: publicProcedure.query(async () => {
    return getFavourites();
  }),
  getFavouriteById: publicProcedure.input(favouriteIdSchema).query(async ({ input }) => {
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
