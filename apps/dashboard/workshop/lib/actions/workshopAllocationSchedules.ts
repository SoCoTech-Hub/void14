"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopAllocationSchedule,
  deleteWorkshopAllocationSchedule,
  updateWorkshopAllocationSchedule,
} from "@/lib/api/workshopAllocationSchedules/mutations";
import {
  WorkshopAllocationScheduleId,
  NewWorkshopAllocationScheduleParams,
  UpdateWorkshopAllocationScheduleParams,
  workshopAllocationScheduleIdSchema,
  insertWorkshopAllocationScheduleParams,
  updateWorkshopAllocationScheduleParams,
} from "@/lib/db/schema/workshopAllocationSchedules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopAllocationSchedules = () => revalidatePath("/workshop-allocation-schedules");

export const createWorkshopAllocationScheduleAction = async (input: NewWorkshopAllocationScheduleParams) => {
  try {
    const payload = insertWorkshopAllocationScheduleParams.parse(input);
    await createWorkshopAllocationSchedule(payload);
    revalidateWorkshopAllocationSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopAllocationScheduleAction = async (input: UpdateWorkshopAllocationScheduleParams) => {
  try {
    const payload = updateWorkshopAllocationScheduleParams.parse(input);
    await updateWorkshopAllocationSchedule(payload.id, payload);
    revalidateWorkshopAllocationSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopAllocationScheduleAction = async (input: WorkshopAllocationScheduleId) => {
  try {
    const payload = workshopAllocationScheduleIdSchema.parse({ id: input });
    await deleteWorkshopAllocationSchedule(payload.id);
    revalidateWorkshopAllocationSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};
