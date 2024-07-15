"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
} from "@/lib/api/workshops/mutations";
import {
  WorkshopId,
  NewWorkshopParams,
  UpdateWorkshopParams,
  workshopIdSchema,
  insertWorkshopParams,
  updateWorkshopParams,
} from "@/lib/db/schema/workshops";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshops = () => revalidatePath("/workshops");

export const createWorkshopAction = async (input: NewWorkshopParams) => {
  try {
    const payload = insertWorkshopParams.parse(input);
    await createWorkshop(payload);
    revalidateWorkshops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopAction = async (input: UpdateWorkshopParams) => {
  try {
    const payload = updateWorkshopParams.parse(input);
    await updateWorkshop(payload.id, payload);
    revalidateWorkshops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopAction = async (input: WorkshopId) => {
  try {
    const payload = workshopIdSchema.parse({ id: input });
    await deleteWorkshop(payload.id);
    revalidateWorkshops();
  } catch (e) {
    return handleErrors(e);
  }
};
