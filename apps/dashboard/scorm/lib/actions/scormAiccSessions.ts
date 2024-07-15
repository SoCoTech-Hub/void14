"use server";

import { revalidatePath } from "next/cache";
import {
  createScormAiccSession,
  deleteScormAiccSession,
  updateScormAiccSession,
} from "@/lib/api/scormAiccSessions/mutations";
import {
  ScormAiccSessionId,
  NewScormAiccSessionParams,
  UpdateScormAiccSessionParams,
  scormAiccSessionIdSchema,
  insertScormAiccSessionParams,
  updateScormAiccSessionParams,
} from "@/lib/db/schema/scormAiccSessions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormAiccSessions = () => revalidatePath("/scorm-aicc-sessions");

export const createScormAiccSessionAction = async (input: NewScormAiccSessionParams) => {
  try {
    const payload = insertScormAiccSessionParams.parse(input);
    await createScormAiccSession(payload);
    revalidateScormAiccSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormAiccSessionAction = async (input: UpdateScormAiccSessionParams) => {
  try {
    const payload = updateScormAiccSessionParams.parse(input);
    await updateScormAiccSession(payload.id, payload);
    revalidateScormAiccSessions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormAiccSessionAction = async (input: ScormAiccSessionId) => {
  try {
    const payload = scormAiccSessionIdSchema.parse({ id: input });
    await deleteScormAiccSession(payload.id);
    revalidateScormAiccSessions();
  } catch (e) {
    return handleErrors(e);
  }
};
