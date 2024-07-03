"use server";

import { revalidatePath } from "next/cache";
import {
  createLockDb,
  deleteLockDb,
  updateLockDb,
} from "@/lib/api/lockDbs/mutations";
import {
  LockDbId,
  NewLockDbParams,
  UpdateLockDbParams,
  lockDbIdSchema,
  insertLockDbParams,
  updateLockDbParams,
} from "@/lib/db/schema/lockDbs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLockDbs = () => revalidatePath("/lock-dbs");

export const createLockDbAction = async (input: NewLockDbParams) => {
  try {
    const payload = insertLockDbParams.parse(input);
    await createLockDb(payload);
    revalidateLockDbs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLockDbAction = async (input: UpdateLockDbParams) => {
  try {
    const payload = updateLockDbParams.parse(input);
    await updateLockDb(payload.id, payload);
    revalidateLockDbs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLockDbAction = async (input: LockDbId) => {
  try {
    const payload = lockDbIdSchema.parse({ id: input });
    await deleteLockDb(payload.id);
    revalidateLockDbs();
  } catch (e) {
    return handleErrors(e);
  }
};