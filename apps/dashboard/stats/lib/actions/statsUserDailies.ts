"use server";

import { revalidatePath } from "next/cache";
import {
  createStatsUserDaily,
  deleteStatsUserDaily,
  updateStatsUserDaily,
} from "@/lib/api/statsUserDailies/mutations";
import {
  StatsUserDailyId,
  NewStatsUserDailyParams,
  UpdateStatsUserDailyParams,
  statsUserDailyIdSchema,
  insertStatsUserDailyParams,
  updateStatsUserDailyParams,
} from "@/lib/db/schema/statsUserDailies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsUserDailies = () => revalidatePath("/stats-user-dailies");

export const createStatsUserDailyAction = async (input: NewStatsUserDailyParams) => {
  try {
    const payload = insertStatsUserDailyParams.parse(input);
    await createStatsUserDaily(payload);
    revalidateStatsUserDailies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsUserDailyAction = async (input: UpdateStatsUserDailyParams) => {
  try {
    const payload = updateStatsUserDailyParams.parse(input);
    await updateStatsUserDaily(payload.id, payload);
    revalidateStatsUserDailies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsUserDailyAction = async (input: StatsUserDailyId) => {
  try {
    const payload = statsUserDailyIdSchema.parse({ id: input });
    await deleteStatsUserDaily(payload.id);
    revalidateStatsUserDailies();
  } catch (e) {
    return handleErrors(e);
  }
};
