"use server";

import { revalidatePath } from "next/cache";

import {
  createStatsWeekly,
  deleteStatsWeekly,
  updateStatsWeekly,
} from "../api/statsWeeklies/mutations";
import {
  insertStatsWeeklyParams,
  NewStatsWeeklyParams,
  StatsWeeklyId,
  statsWeeklyIdSchema,
  UpdateStatsWeeklyParams,
  updateStatsWeeklyParams,
} from "../db/schema/statsWeeklies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsWeeklies = () => revalidatePath("/stats-weeklies");

export const createStatsWeeklyAction = async (input: NewStatsWeeklyParams) => {
  try {
    const payload = insertStatsWeeklyParams.parse(input);
    await createStatsWeekly(payload);
    revalidateStatsWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsWeeklyAction = async (
  input: UpdateStatsWeeklyParams,
) => {
  try {
    const payload = updateStatsWeeklyParams.parse(input);
    await updateStatsWeekly(payload.id, payload);
    revalidateStatsWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsWeeklyAction = async (input: StatsWeeklyId) => {
  try {
    const payload = statsWeeklyIdSchema.parse({ id: input });
    await deleteStatsWeekly(payload.id);
    revalidateStatsWeeklies();
  } catch (e) {
    return handleErrors(e);
  }
};
