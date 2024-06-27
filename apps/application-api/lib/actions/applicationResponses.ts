"use server";

import { revalidatePath } from "next/cache";
import {
  createApplicationResponse,
  deleteApplicationResponse,
  updateApplicationResponse,
} from "@/lib/api/applicationResponses/mutations";
import {
  ApplicationResponseId,
  NewApplicationResponseParams,
  UpdateApplicationResponseParams,
  applicationResponseIdSchema,
  insertApplicationResponseParams,
  updateApplicationResponseParams,
} from "@/lib/db/schema/applicationResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateApplicationResponses = () => revalidatePath("/application-responses");

export const createApplicationResponseAction = async (input: NewApplicationResponseParams) => {
  try {
    const payload = insertApplicationResponseParams.parse(input);
    await createApplicationResponse(payload);
    revalidateApplicationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateApplicationResponseAction = async (input: UpdateApplicationResponseParams) => {
  try {
    const payload = updateApplicationResponseParams.parse(input);
    await updateApplicationResponse(payload.id, payload);
    revalidateApplicationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteApplicationResponseAction = async (input: ApplicationResponseId) => {
  try {
    const payload = applicationResponseIdSchema.parse({ id: input });
    await deleteApplicationResponse(payload.id);
    revalidateApplicationResponses();
  } catch (e) {
    return handleErrors(e);
  }
};