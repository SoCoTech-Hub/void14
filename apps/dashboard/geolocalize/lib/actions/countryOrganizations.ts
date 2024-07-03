"use server";

import { revalidatePath } from "next/cache";
import {
  createCountryOrganization,
  deleteCountryOrganization,
  updateCountryOrganization,
} from "@/lib/api/countryOrganizations/mutations";
import {
  CountryOrganizationId,
  NewCountryOrganizationParams,
  UpdateCountryOrganizationParams,
  countryOrganizationIdSchema,
  insertCountryOrganizationParams,
  updateCountryOrganizationParams,
} from "@/lib/db/schema/countryOrganizations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCountryOrganizations = () => revalidatePath("/country-organizations");

export const createCountryOrganizationAction = async (input: NewCountryOrganizationParams) => {
  try {
    const payload = insertCountryOrganizationParams.parse(input);
    await createCountryOrganization(payload);
    revalidateCountryOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCountryOrganizationAction = async (input: UpdateCountryOrganizationParams) => {
  try {
    const payload = updateCountryOrganizationParams.parse(input);
    await updateCountryOrganization(payload.id, payload);
    revalidateCountryOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCountryOrganizationAction = async (input: CountryOrganizationId) => {
  try {
    const payload = countryOrganizationIdSchema.parse({ id: input });
    await deleteCountryOrganization(payload.id);
    revalidateCountryOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};