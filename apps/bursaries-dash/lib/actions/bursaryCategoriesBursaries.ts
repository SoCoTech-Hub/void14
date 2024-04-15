"use server";

import { revalidatePath } from "next/cache";
import {
  createBursaryCategoriesBursary,
  deleteBursaryCategoriesBursary,
  updateBursaryCategoriesBursary,
} from "@/lib/api/bursaryCategoriesBursaries/mutations";
import {
  BursaryCategoriesBursaryId,
  NewBursaryCategoriesBursaryParams,
  UpdateBursaryCategoriesBursaryParams,
  bursaryCategoriesBursaryIdSchema,
  insertBursaryCategoriesBursaryParams,
  updateBursaryCategoriesBursaryParams,
} from "@/lib/db/schema/bursaryCategoriesBursaries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBursaryCategoriesBursaries = () => revalidatePath("/bursary-categories-bursaries");

export const createBursaryCategoriesBursaryAction = async (input: NewBursaryCategoriesBursaryParams) => {
  try {
    const payload = insertBursaryCategoriesBursaryParams.parse(input);
    await createBursaryCategoriesBursary(payload);
    revalidateBursaryCategoriesBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBursaryCategoriesBursaryAction = async (input: UpdateBursaryCategoriesBursaryParams) => {
  try {
    const payload = updateBursaryCategoriesBursaryParams.parse(input);
    await updateBursaryCategoriesBursary(payload.id, payload);
    revalidateBursaryCategoriesBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBursaryCategoriesBursaryAction = async (input: BursaryCategoriesBursaryId) => {
  try {
    const payload = bursaryCategoriesBursaryIdSchema.parse({ id: input });
    await deleteBursaryCategoriesBursary(payload.id);
    revalidateBursaryCategoriesBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};