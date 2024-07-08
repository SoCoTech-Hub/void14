import { db } from "@soco/rating-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type RatingId, ratingIdSchema, ratings } from "@soco/rating-db/schema/ratings";

export const getRatings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(ratings).where(eq(ratings.userId, session?.user.id!));
  const r = rows
  return { ratings: r };
};

export const getRatingById = async (id: RatingId) => {
  const { session } = await getUserAuth();
  const { id: ratingId } = ratingIdSchema.parse({ id });
  const [row] = await db.select().from(ratings).where(and(eq(ratings.id, ratingId), eq(ratings.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { rating: r };
};


