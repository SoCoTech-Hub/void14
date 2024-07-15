"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrol,
  deleteEnrol,
  updateEnrol,
} from "@/lib/api/enrols/mutations";
import {
  EnrolId,
  NewEnrolParams,
  UpdateEnrolParams,
  enrolIdSchema,
  insertEnrolParams,
  updateEnrolParams,
} from "@/lib/db/schema/enrols";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrols = () => revalidatePath("/enrols");

export const createEnrolAction = async (input: NewEnrolParams) => {
  try {
    const payload = insertEnrolParams.parse(input);
    await createEnrol(payload);
    revalidateEnrols();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolAction = async (input: UpdateEnrolParams) => {
  try {
    const payload = updateEnrolParams.parse(input);
    await updateEnrol(payload.id, payload);
    revalidateEnrols();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolAction = async (input: EnrolId) => {
  try {
    const payload = enrolIdSchema.parse({ id: input });
    await deleteEnrol(payload.id);
    revalidateEnrols();
  } catch (e) {
    return handleErrors(e);
  }
};
