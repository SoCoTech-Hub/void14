"use server";

import { revalidatePath } from "next/cache";
import {
  createCohortMember,
  deleteCohortMember,
  updateCohortMember,
} from "@/lib/api/cohortMembers/mutations";
import {
  CohortMemberId,
  NewCohortMemberParams,
  UpdateCohortMemberParams,
  cohortMemberIdSchema,
  insertCohortMemberParams,
  updateCohortMemberParams,
} from "@/lib/db/schema/cohortMembers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateCohortMembers = () => revalidatePath("/cohort-members");

export const createCohortMemberAction = async (input: NewCohortMemberParams) => {
  try {
    const payload = insertCohortMemberParams.parse(input);
    await createCohortMember(payload);
    revalidateCohortMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateCohortMemberAction = async (input: UpdateCohortMemberParams) => {
  try {
    const payload = updateCohortMemberParams.parse(input);
    await updateCohortMember(payload.id, payload);
    revalidateCohortMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteCohortMemberAction = async (input: CohortMemberId) => {
  try {
    const payload = cohortMemberIdSchema.parse({ id: input });
    await deleteCohortMember(payload.id);
    revalidateCohortMembers();
  } catch (e) {
    return handleErrors(e);
  }
};