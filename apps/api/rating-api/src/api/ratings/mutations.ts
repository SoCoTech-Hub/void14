import type {
  NewRatingParams,
  RatingId,
  UpdateRatingParams,
} from "@soco/rating-db/schema/ratings";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/rating-db";
import { db } from "@soco/rating-db/client";
import {
  insertRatingSchema,
  ratingIdSchema,
  ratings,
  updateRatingSchema,
} from "@soco/rating-db/schema/ratings";

export const createRating = async (rating: NewRatingParams) => {
  const { session } = await getUserAuth();
  const newRating = insertRatingSchema.parse({
    ...rating,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db.insert(ratings).values(newRating).returning();
    return { rating: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRating = async (
  id: RatingId,
  rating: UpdateRatingParams,
) => {
  const { session } = await getUserAuth();
  const { id: ratingId } = ratingIdSchema.parse({ id });
  const newRating = updateRatingSchema.parse({
    ...rating,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(ratings)
      .set({ ...newRating, updatedAt: new Date() })
      .where(
        and(eq(ratings.id, ratingId!), eq(ratings.userId, session?.user.id!)),
      )
      .returning();
    return { rating: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRating = async (id: RatingId) => {
  const { session } = await getUserAuth();
  const { id: ratingId } = ratingIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(ratings)
      .where(
        and(eq(ratings.id, ratingId!), eq(ratings.userId, session?.user.id!)),
      )
      .returning();
    return { rating: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
