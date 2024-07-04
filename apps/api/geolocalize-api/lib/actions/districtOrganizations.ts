"use server";

import { revalidatePath } from "next/cache";

import {
  createDistrictOrganization,
  deleteDistrictOrganization,
  updateDistrictOrganization,
} from "../api/districtOrganizations/mutations";
import {
  DistrictOrganizationId,
  districtOrganizationIdSchema,
  insertDistrictOrganizationParams,
  NewDistrictOrganizationParams,
  UpdateDistrictOrganizationParams,
  updateDistrictOrganizationParams,
} from "../db/schema/districtOrganizations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDistrictOrganizations = () =>
  revalidatePath("/district-organizations");

export const createDistrictOrganizationAction = async (
  input: NewDistrictOrganizationParams,
) => {
  try {
    const payload = insertDistrictOrganizationParams.parse(input);
    await createDistrictOrganization(payload);
    revalidateDistrictOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDistrictOrganizationAction = async (
  input: UpdateDistrictOrganizationParams,
) => {
  try {
    const payload = updateDistrictOrganizationParams.parse(input);
    await updateDistrictOrganization(payload.id, payload);
    revalidateDistrictOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDistrictOrganizationAction = async (
  input: DistrictOrganizationId,
) => {
  try {
    const payload = districtOrganizationIdSchema.parse({ id: input });
    await deleteDistrictOrganization(payload.id);
    revalidateDistrictOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};
