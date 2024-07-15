"use server";

import { revalidatePath } from "next/cache";
import {
  createStatsUserWeekly,
  deleteStatsUserWeekly,
  updateStatsUserWeekly,
} from "@/lib/api/statsUserWeeklies/mutations";
import {
  StatsUserWeeklyId,
  NewStatsUserWeeklyParams,
  UpdateStatsUserWeeklyParams,
  statsUserWeeklyIdSchema,
  insertStatsUserWeeklyParams,
  updateStatsUserWeeklyParams,
} from "@/lib/db/schema/statsUserWeeklies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsUserWeeklies = () => revalidatePath("/stats-user-weeklies");

export const createStatsUserWeeklyAction = async (input: NewStatsUserWeeklyParams) => {
  try {
    const payload = insertStatsUserWeeklyParams.parse(input);
    await createStatsUserWeekly(payload);
    revalidateStatsUserWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsUserWeeklyAction = async (input: UpdateStatsUserWeeklyParams) => {
  try {
    const payload = updateStatsUserWeeklyParams.parse(input);
    await updateStatsUserWeekly(payload.id, payload);
    revalidateStatsUserWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsUserWeeklyAction = async (input: StatsUserWeeklyId) => {
  try {
    const payload = statsUserWeeklyIdSchema.parse({ id: input });
    await deleteStatsUserWeekly(payload.id);
    revalidateStatsUserWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};
