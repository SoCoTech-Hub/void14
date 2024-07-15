"use server";

import { revalidatePath } from "next/cache";
import {
  createLti,
  deleteLti,
  updateLti,
} from "@/lib/api/ltis/mutations";
import {
  LtiId,
  NewLtiParams,
  UpdateLtiParams,
  ltiIdSchema,
  insertLtiParams,
  updateLtiParams,
} from "@/lib/db/schema/ltis";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtis = () => revalidatePath("/ltis");

export const createLtiAction = async (input: NewLtiParams) => {
  try {
    const payload = insertLtiParams.parse(input);
    await createLti(payload);
    revalidateLtis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiAction = async (input: UpdateLtiParams) => {
  try {
    const payload = updateLtiParams.parse(input);
    await updateLti(payload.id, payload);
    revalidateLtis();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiAction = async (input: LtiId) => {
  try {
    const payload = ltiIdSchema.parse({ id: input });
    await deleteLti(payload.id);
    revalidateLtis();
  } catch (e) {
    return handleErrors(e);
  }
};
