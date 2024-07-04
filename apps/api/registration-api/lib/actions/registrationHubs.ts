"use server";

import { revalidatePath } from "next/cache";

import {
  createRegistrationHub,
  deleteRegistrationHub,
  updateRegistrationHub,
} from "../api/registrationHubs/mutations";
import {
  insertRegistrationHubParams,
  NewRegistrationHubParams,
  RegistrationHubId,
  registrationHubIdSchema,
  UpdateRegistrationHubParams,
  updateRegistrationHubParams,
} from "../db/schema/registrationHubs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRegistrationHubs = () => revalidatePath("/registration-hubs");

export const createRegistrationHubAction = async (
  input: NewRegistrationHubParams,
) => {
  try {
    const payload = insertRegistrationHubParams.parse(input);
    await createRegistrationHub(payload);
    revalidateRegistrationHubs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRegistrationHubAction = async (
  input: UpdateRegistrationHubParams,
) => {
  try {
    const payload = updateRegistrationHubParams.parse(input);
    await updateRegistrationHub(payload.id, payload);
    revalidateRegistrationHubs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRegistrationHubAction = async (input: RegistrationHubId) => {
  try {
    const payload = registrationHubIdSchema.parse({ id: input });
    await deleteRegistrationHub(payload.id);
    revalidateRegistrationHubs();
  } catch (e) {
    return handleErrors(e);
  }
};
