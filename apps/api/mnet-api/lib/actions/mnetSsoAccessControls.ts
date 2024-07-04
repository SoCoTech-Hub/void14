"use server";

import { revalidatePath } from "next/cache";

import {
  createMnetSsoAccessControl,
  deleteMnetSsoAccessControl,
  updateMnetSsoAccessControl,
} from "../api/mnetSsoAccessControls/mutations";
import {
  insertMnetSsoAccessControlParams,
  MnetSsoAccessControlId,
  mnetSsoAccessControlIdSchema,
  NewMnetSsoAccessControlParams,
  UpdateMnetSsoAccessControlParams,
  updateMnetSsoAccessControlParams,
} from "../db/schema/mnetSsoAccessControls";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetSsoAccessControls = () =>
  revalidatePath("/mnet-sso-access-controls");

export const createMnetSsoAccessControlAction = async (
  input: NewMnetSsoAccessControlParams,
) => {
  try {
    const payload = insertMnetSsoAccessControlParams.parse(input);
    await createMnetSsoAccessControl(payload);
    revalidateMnetSsoAccessControls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetSsoAccessControlAction = async (
  input: UpdateMnetSsoAccessControlParams,
) => {
  try {
    const payload = updateMnetSsoAccessControlParams.parse(input);
    await updateMnetSsoAccessControl(payload.id, payload);
    revalidateMnetSsoAccessControls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetSsoAccessControlAction = async (
  input: MnetSsoAccessControlId,
) => {
  try {
    const payload = mnetSsoAccessControlIdSchema.parse({ id: input });
    await deleteMnetSsoAccessControl(payload.id);
    revalidateMnetSsoAccessControls();
  } catch (e) {
    return handleErrors(e);
  }
};
