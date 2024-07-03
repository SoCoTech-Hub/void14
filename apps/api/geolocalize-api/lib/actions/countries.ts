"use server";

import { revalidatePath } from "next/cache";
import {
  createCountry,
  deleteCountry,
  updateCountry,
} from "@/lib/api/countries/mutations";
import {
  CountryId,
  NewCountryParams,
  UpdateCountryParams,
  countryIdSchema,
  insertCountryParams,
  updateCountryParams,
} from "@/lib/db/schema/countries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCountries = () => revalidatePath("/countries");

export const createCountryAction = async (input: NewCountryParams) => {
  try {
    const payload = insertCountryParams.parse(input);
    await createCountry(payload);
    revalidateCountries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCountryAction = async (input: UpdateCountryParams) => {
  try {
    const payload = updateCountryParams.parse(input);
    await updateCountry(payload.id, payload);
    revalidateCountries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCountryAction = async (input: CountryId) => {
  try {
    const payload = countryIdSchema.parse({ id: input });
    await deleteCountry(payload.id);
    revalidateCountries();
  } catch (e) {
    return handleErrors(e);
  }
};