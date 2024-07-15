"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetHost2service,
  deleteMnetHost2service,
  updateMnetHost2service,
} from "@/lib/api/mnetHost2services/mutations";
import {
  MnetHost2serviceId,
  NewMnetHost2serviceParams,
  UpdateMnetHost2serviceParams,
  mnetHost2serviceIdSchema,
  insertMnetHost2serviceParams,
  updateMnetHost2serviceParams,
} from "@/lib/db/schema/mnetHost2services";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetHost2services = () => revalidatePath("/mnet-host2services");

export const createMnetHost2serviceAction = async (input: NewMnetHost2serviceParams) => {
  try {
    const payload = insertMnetHost2serviceParams.parse(input);
    await createMnetHost2service(payload);
    revalidateMnetHost2services();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetHost2serviceAction = async (input: UpdateMnetHost2serviceParams) => {
  try {
    const payload = updateMnetHost2serviceParams.parse(input);
    await updateMnetHost2service(payload.id, payload);
    revalidateMnetHost2services();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetHost2serviceAction = async (input: MnetHost2serviceId) => {
  try {
    const payload = mnetHost2serviceIdSchema.parse({ id: input });
    await deleteMnetHost2service(payload.id);
    revalidateMnetHost2services();
  } catch (e) {
    return handleErrors(e);
  }
};
