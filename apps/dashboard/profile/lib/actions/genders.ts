"use server";

import { revalidatePath } from "next/cache";
import {
  createGender,
  deleteGender,
  updateGender,
} from "@/lib/api/genders/mutations";
import {
  GenderId,
  NewGenderParams,
  UpdateGenderParams,
  genderIdSchema,
  insertGenderParams,
  updateGenderParams,
} from "@/lib/db/schema/genders";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGenders = () => revalidatePath("/genders");

export const createGenderAction = async (input: NewGenderParams) => {
  try {
    const payload = insertGenderParams.parse(input);
    await createGender(payload);
    revalidateGenders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGenderAction = async (input: UpdateGenderParams) => {
  try {
    const payload = updateGenderParams.parse(input);
    await updateGender(payload.id, payload);
    revalidateGenders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGenderAction = async (input: GenderId) => {
  try {
    const payload = genderIdSchema.parse({ id: input });
    await deleteGender(payload.id);
    revalidateGenders();
  } catch (e) {
    return handleErrors(e);
  }
};
