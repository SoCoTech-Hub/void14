"use server";

import { revalidatePath } from "next/cache";
import {
  createUniversity,
  deleteUniversity,
  updateUniversity,
} from "@/lib/api/universities/mutations";
import {
  UniversityId,
  NewUniversityParams,
  UpdateUniversityParams,
  universityIdSchema,
  insertUniversityParams,
  updateUniversityParams,
} from "@/lib/db/schema/universities";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUniversities = () => revalidatePath("/universities");

export const createUniversityAction = async (input: NewUniversityParams) => {
  try {
    const payload = insertUniversityParams.parse(input);
    await createUniversity(payload);
    revalidateUniversities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUniversityAction = async (input: UpdateUniversityParams) => {
  try {
    const payload = updateUniversityParams.parse(input);
    await updateUniversity(payload.id, payload);
    revalidateUniversities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUniversityAction = async (input: UniversityId) => {
  try {
    const payload = universityIdSchema.parse({ id: input });
    await deleteUniversity(payload.id);
    revalidateUniversities();
  } catch (e) {
    return handleErrors(e);
  }
};