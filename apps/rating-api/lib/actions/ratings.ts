"use server";

import { revalidatePath } from "next/cache";
import {
  createRating,
  deleteRating,
  updateRating,
} from "@/lib/api/ratings/mutations";
import {
  RatingId,
  NewRatingParams,
  UpdateRatingParams,
  ratingIdSchema,
  insertRatingParams,
  updateRatingParams,
} from "@/lib/db/schema/ratings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRatings = () => revalidatePath("/ratings");

export const createRatingAction = async (input: NewRatingParams) => {
  try {
    const payload = insertRatingParams.parse(input);
    await createRating(payload);
    revalidateRatings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRatingAction = async (input: UpdateRatingParams) => {
  try {
    const payload = updateRatingParams.parse(input);
    await updateRating(payload.id, payload);
    revalidateRatings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRatingAction = async (input: RatingId) => {
  try {
    const payload = ratingIdSchema.parse({ id: input });
    await deleteRating(payload.id);
    revalidateRatings();
  } catch (e) {
    return handleErrors(e);
  }
};