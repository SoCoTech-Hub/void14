"use server";

import { revalidatePath } from "next/cache";
import {
  createStatsUserMonthly,
  deleteStatsUserMonthly,
  updateStatsUserMonthly,
} from "@/lib/api/statsUserMonthlies/mutations";
import {
  StatsUserMonthlyId,
  NewStatsUserMonthlyParams,
  UpdateStatsUserMonthlyParams,
  statsUserMonthlyIdSchema,
  insertStatsUserMonthlyParams,
  updateStatsUserMonthlyParams,
} from "@/lib/db/schema/statsUserMonthlies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsUserMonthlies = () => revalidatePath("/stats-user-monthlies");

export const createStatsUserMonthlyAction = async (input: NewStatsUserMonthlyParams) => {
  try {
    const payload = insertStatsUserMonthlyParams.parse(input);
    await createStatsUserMonthly(payload);
    revalidateStatsUserMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsUserMonthlyAction = async (input: UpdateStatsUserMonthlyParams) => {
  try {
    const payload = updateStatsUserMonthlyParams.parse(input);
    await updateStatsUserMonthly(payload.id, payload);
    revalidateStatsUserMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsUserMonthlyAction = async (input: StatsUserMonthlyId) => {
  try {
    const payload = statsUserMonthlyIdSchema.parse({ id: input });
    await deleteStatsUserMonthly(payload.id);
    revalidateStatsUserMonthlies();
  } catch (e) {
    return handleErrors(e);
  }
};
