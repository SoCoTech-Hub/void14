"use server";

import { revalidatePath } from "next/cache";
import {
  createProvinceOrganization,
  deleteProvinceOrganization,
  updateProvinceOrganization,
} from "@/lib/api/provinceOrganizations/mutations";
import {
  ProvinceOrganizationId,
  NewProvinceOrganizationParams,
  UpdateProvinceOrganizationParams,
  provinceOrganizationIdSchema,
  insertProvinceOrganizationParams,
  updateProvinceOrganizationParams,
} from "@/lib/db/schema/provinceOrganizations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateProvinceOrganizations = () => revalidatePath("/province-organizations");

export const createProvinceOrganizationAction = async (input: NewProvinceOrganizationParams) => {
  try {
    const payload = insertProvinceOrganizationParams.parse(input);
    await createProvinceOrganization(payload);
    revalidateProvinceOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateProvinceOrganizationAction = async (input: UpdateProvinceOrganizationParams) => {
  try {
    const payload = updateProvinceOrganizationParams.parse(input);
    await updateProvinceOrganization(payload.id, payload);
    revalidateProvinceOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteProvinceOrganizationAction = async (input: ProvinceOrganizationId) => {
  try {
    const payload = provinceOrganizationIdSchema.parse({ id: input });
    await deleteProvinceOrganization(payload.id);
    revalidateProvinceOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};