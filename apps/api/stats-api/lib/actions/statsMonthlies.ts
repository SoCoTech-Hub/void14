"use server";

import { revalidatePath } from "next/cache";

import {
  createStatsMonthly,
  deleteStatsMonthly,
  updateStatsMonthly,
} from "../api/statsMonthlies/mutations";
import {
  insertStatsMonthlyParams,
  NewStatsMonthlyParams,
  StatsMonthlyId,
  statsMonthlyIdSchema,
  UpdateStatsMonthlyParams,
  updateStatsMonthlyParams,
} from "../db/schema/statsMonthlies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsMonthlies = () => revalidatePath("/stats-monthlies");

export const createStatsMonthlyAction = async (
  input: NewStatsMonthlyParams,
) => {
  try {
    const payload = insertStatsMonthlyParams.parse(input);
    await createStatsMonthly(payload);
    revalidateStatsMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsMonthlyAction = async (
  input: UpdateStatsMonthlyParams,
) => {
  try {
    const payload = updateStatsMonthlyParams.parse(input);
    await updateStatsMonthly(payload.id, payload);
    revalidateStatsMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsMonthlyAction = async (input: StatsMonthlyId) => {
  try {
    const payload = statsMonthlyIdSchema.parse({ id: input });
    await deleteStatsMonthly(payload.id);
    revalidateStatsMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};
