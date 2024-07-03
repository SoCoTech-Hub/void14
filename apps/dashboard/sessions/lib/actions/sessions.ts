"use server";

import { revalidatePath } from "next/cache";
import {
  createSession,
  deleteSession,
  updateSession,
} from "@/lib/api/sessions/mutations";
import {
  SessionId,
  NewSessionParams,
  UpdateSessionParams,
  sessionIdSchema,
  insertSessionParams,
  updateSessionParams,
} from "@/lib/db/schema/sessions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSessions = () => revalidatePath("/sessions");

export const createSessionAction = async (input: NewSessionParams) => {
  try {
    const payload = insertSessionParams.parse(input);
    await createSession(payload);
    revalidateSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSessionAction = async (input: UpdateSessionParams) => {
  try {
    const payload = updateSessionParams.parse(input);
    await updateSession(payload.id, payload);
    revalidateSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSessionAction = async (input: SessionId) => {
  try {
    const payload = sessionIdSchema.parse({ id: input });
    await deleteSession(payload.id);
    revalidateSessions();
  } catch (e) {
    return handleErrors(e);
  }
};