import {
  insertRatingParams,
  ratingIdSchema,
  updateRatingParams,
} from "@soco/rating-db/schema/ratings";

import {
  createRating,
  deleteRating,
  updateRating,
} from "../api/ratings/mutations";
import { getRatingById, getRatings } from "../api/ratings/queries";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ratingsRouter: ReturnType<typeof createTRPCRouter> =
  createTRPCRouter({
    getRatings: publicProcedure.query(async () => {
      return getRatings();
    }),
    getRatingById: publicProcedure
      .input(ratingIdSchema)
      .query(async ({ input }) => {
        return getRatingById(input.id);
      }),
    createRating: publicProcedure
      .input(insertRatingParams)
      .mutation(async ({ input }) => {
        return createRating(input);
      }),
    updateRating: publicProcedure
      .input(updateRatingParams)
      .mutation(async ({ input }) => {
        return updateRating(input.id, input);
      }),
    deleteRating: publicProcedure
      .input(ratingIdSchema)
      .mutation(async ({ input }) => {
        return deleteRating(input.id);
      }),
  });
