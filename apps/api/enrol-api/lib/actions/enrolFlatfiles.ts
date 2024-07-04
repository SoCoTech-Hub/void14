"use server";

import { revalidatePath } from "next/cache";

import {
  createEnrolFlatfile,
  deleteEnrolFlatfile,
  updateEnrolFlatfile,
} from "../api/enrolFlatfiles/mutations";
import {
  EnrolFlatfileId,
  enrolFlatfileIdSchema,
  insertEnrolFlatfileParams,
  NewEnrolFlatfileParams,
  UpdateEnrolFlatfileParams,
  updateEnrolFlatfileParams,
} from "../db/schema/enrolFlatfiles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolFlatfiles = () => revalidatePath("/enrol-flatfiles");

export const createEnrolFlatfileAction = async (
  input: NewEnrolFlatfileParams,
) => {
  try {
    const payload = insertEnrolFlatfileParams.parse(input);
    await createEnrolFlatfile(payload);
    revalidateEnrolFlatfiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolFlatfileAction = async (
  input: UpdateEnrolFlatfileParams,
) => {
  try {
    const payload = updateEnrolFlatfileParams.parse(input);
    await updateEnrolFlatfile(payload.id, payload);
    revalidateEnrolFlatfiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolFlatfileAction = async (input: EnrolFlatfileId) => {
  try {
    const payload = enrolFlatfileIdSchema.parse({ id: input });
    await deleteEnrolFlatfile(payload.id);
    revalidateEnrolFlatfiles();
  } catch (e) {
    return handleErrors(e);
  }
};
