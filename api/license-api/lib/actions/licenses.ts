"use server";

import { revalidatePath } from "next/cache";
import {
  createLicense,
  deleteLicense,
  updateLicense,
} from "@/lib/api/licenses/mutations";
import {
  LicenseId,
  NewLicenseParams,
  UpdateLicenseParams,
  licenseIdSchema,
  insertLicenseParams,
  updateLicenseParams,
} from "@/lib/db/schema/licenses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLicenses = () => revalidatePath("/licenses");

export const createLicenseAction = async (input: NewLicenseParams) => {
  try {
    const payload = insertLicenseParams.parse(input);
    await createLicense(payload);
    revalidateLicenses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLicenseAction = async (input: UpdateLicenseParams) => {
  try {
    const payload = updateLicenseParams.parse(input);
    await updateLicense(payload.id, payload);
    revalidateLicenses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLicenseAction = async (input: LicenseId) => {
  try {
    const payload = licenseIdSchema.parse({ id: input });
    await deleteLicense(payload.id);
    revalidateLicenses();
  } catch (e) {
    return handleErrors(e);
  }
};