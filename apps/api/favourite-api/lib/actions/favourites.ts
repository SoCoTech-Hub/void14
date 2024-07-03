"use server";

import { revalidatePath } from "next/cache";
import {
  createFavourite,
  deleteFavourite,
  updateFavourite,
} from "@/lib/api/favourites/mutations";
import {
  FavouriteId,
  NewFavouriteParams,
  UpdateFavouriteParams,
  favouriteIdSchema,
  insertFavouriteParams,
  updateFavouriteParams,
} from "@/lib/db/schema/favourites";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFavourites = () => revalidatePath("/favourites");

export const createFavouriteAction = async (input: NewFavouriteParams) => {
  try {
    const payload = insertFavouriteParams.parse(input);
    await createFavourite(payload);
    revalidateFavourites();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFavouriteAction = async (input: UpdateFavouriteParams) => {
  try {
    const payload = updateFavouriteParams.parse(input);
    await updateFavourite(payload.id, payload);
    revalidateFavourites();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFavouriteAction = async (input: FavouriteId) => {
  try {
    const payload = favouriteIdSchema.parse({ id: input });
    await deleteFavourite(payload.id);
    revalidateFavourites();
  } catch (e) {
    return handleErrors(e);
  }
};