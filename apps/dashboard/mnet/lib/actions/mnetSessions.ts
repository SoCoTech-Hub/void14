"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetSession,
  deleteMnetSession,
  updateMnetSession,
} from "@/lib/api/mnetSessions/mutations";
import {
  MnetSessionId,
  NewMnetSessionParams,
  UpdateMnetSessionParams,
  mnetSessionIdSchema,
  insertMnetSessionParams,
  updateMnetSessionParams,
} from "@/lib/db/schema/mnetSessions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetSessions = () => revalidatePath("/mnet-sessions");

export const createMnetSessionAction = async (input: NewMnetSessionParams) => {
  try {
    const payload = insertMnetSessionParams.parse(input);
    await createMnetSession(payload);
    revalidateMnetSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetSessionAction = async (input: UpdateMnetSessionParams) => {
  try {
    const payload = updateMnetSessionParams.parse(input);
    await updateMnetSession(payload.id, payload);
    revalidateMnetSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetSessionAction = async (input: MnetSessionId) => {
  try {
    const payload = mnetSessionIdSchema.parse({ id: input });
    await deleteMnetSession(payload.id);
    revalidateMnetSessions();
  } catch (e) {
    return handleErrors(e);
  }
};
