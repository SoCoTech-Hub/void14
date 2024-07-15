"use server";

import { revalidatePath } from "next/cache";
import {
  createUserSchool,
  deleteUserSchool,
  updateUserSchool,
} from "@/lib/api/userSchools/mutations";
import {
  UserSchoolId,
  NewUserSchoolParams,
  UpdateUserSchoolParams,
  userSchoolIdSchema,
  insertUserSchoolParams,
  updateUserSchoolParams,
} from "@/lib/db/schema/userSchools";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserSchools = () => revalidatePath("/user-schools");

export const createUserSchoolAction = async (input: NewUserSchoolParams) => {
  try {
    const payload = insertUserSchoolParams.parse(input);
    await createUserSchool(payload);
    revalidateUserSchools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserSchoolAction = async (input: UpdateUserSchoolParams) => {
  try {
    const payload = updateUserSchoolParams.parse(input);
    await updateUserSchool(payload.id, payload);
    revalidateUserSchools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserSchoolAction = async (input: UserSchoolId) => {
  try {
    const payload = userSchoolIdSchema.parse({ id: input });
    await deleteUserSchool(payload.id);
    revalidateUserSchools();
  } catch (e) {
    return handleErrors(e);
  }
};
