"use server";

import { revalidatePath } from "next/cache";
import {
  createStatsDaily,
  deleteStatsDaily,
  updateStatsDaily,
} from "@/lib/api/statsDailies/mutations";
import {
  StatsDailyId,
  NewStatsDailyParams,
  UpdateStatsDailyParams,
  statsDailyIdSchema,
  insertStatsDailyParams,
  updateStatsDailyParams,
} from "@/lib/db/schema/statsDailies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateStatsDailies = () => revalidatePath("/stats-dailies");

export const createStatsDailyAction = async (input: NewStatsDailyParams) => {
  try {
    const payload = insertStatsDailyParams.parse(input);
    await createStatsDaily(payload);
    revalidateStatsDailies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateStatsDailyAction = async (input: UpdateStatsDailyParams) => {
  try {
    const payload = updateStatsDailyParams.parse(input);
    await updateStatsDaily(payload.id, payload);
    revalidateStatsDailies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteStatsDailyAction = async (input: StatsDailyId) => {
  try {
    const payload = statsDailyIdSchema.parse({ id: input });
    await deleteStatsDaily(payload.id);
    revalidateStatsDailies();
  } catch (e) {
    return handleErrors(e);
  }
};
