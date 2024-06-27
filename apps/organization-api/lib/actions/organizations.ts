"use server";

import { revalidatePath } from "next/cache";
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "@/lib/api/organizations/mutations";
import {
  OrganizationId,
  NewOrganizationParams,
  UpdateOrganizationParams,
  organizationIdSchema,
  insertOrganizationParams,
  updateOrganizationParams,
} from "@/lib/db/schema/organizations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOrganizations = () => revalidatePath("/organizations");

export const createOrganizationAction = async (input: NewOrganizationParams) => {
  try {
    const payload = insertOrganizationParams.parse(input);
    await createOrganization(payload);
    revalidateOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOrganizationAction = async (input: UpdateOrganizationParams) => {
  try {
    const payload = updateOrganizationParams.parse(input);
    await updateOrganization(payload.id, payload);
    revalidateOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOrganizationAction = async (input: OrganizationId) => {
  try {
    const payload = organizationIdSchema.parse({ id: input });
    await deleteOrganization(payload.id);
    revalidateOrganizations();
  } catch (e) {
    return handleErrors(e);
  }
};