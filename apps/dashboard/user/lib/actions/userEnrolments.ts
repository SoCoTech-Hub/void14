"use server";

import { revalidatePath } from "next/cache";
import {
  createUserEnrolment,
  deleteUserEnrolment,
  updateUserEnrolment,
} from "@/lib/api/userEnrolments/mutations";
import {
  UserEnrolmentId,
  NewUserEnrolmentParams,
  UpdateUserEnrolmentParams,
  userEnrolmentIdSchema,
  insertUserEnrolmentParams,
  updateUserEnrolmentParams,
} from "@/lib/db/schema/userEnrolments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserEnrolments = () => revalidatePath("/user-enrolments");

export const createUserEnrolmentAction = async (input: NewUserEnrolmentParams) => {
  try {
    const payload = insertUserEnrolmentParams.parse(input);
    await createUserEnrolment(payload);
    revalidateUserEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserEnrolmentAction = async (input: UpdateUserEnrolmentParams) => {
  try {
    const payload = updateUserEnrolmentParams.parse(input);
    await updateUserEnrolment(payload.id, payload);
    revalidateUserEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserEnrolmentAction = async (input: UserEnrolmentId) => {
  try {
    const payload = userEnrolmentIdSchema.parse({ id: input });
    await deleteUserEnrolment(payload.id);
    revalidateUserEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};
