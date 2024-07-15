"use server";

import { revalidatePath } from "next/cache";
import {
  createFilterConfig,
  deleteFilterConfig,
  updateFilterConfig,
} from "@/lib/api/filterConfigs/mutations";
import {
  FilterConfigId,
  NewFilterConfigParams,
  UpdateFilterConfigParams,
  filterConfigIdSchema,
  insertFilterConfigParams,
  updateFilterConfigParams,
} from "@/lib/db/schema/filterConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFilterConfigs = () => revalidatePath("/filter-configs");

export const createFilterConfigAction = async (input: NewFilterConfigParams) => {
  try {
    const payload = insertFilterConfigParams.parse(input);
    await createFilterConfig(payload);
    revalidateFilterConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFilterConfigAction = async (input: UpdateFilterConfigParams) => {
  try {
    const payload = updateFilterConfigParams.parse(input);
    await updateFilterConfig(payload.id, payload);
    revalidateFilterConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFilterConfigAction = async (input: FilterConfigId) => {
  try {
    const payload = filterConfigIdSchema.parse({ id: input });
    await deleteFilterConfig(payload.id);
    revalidateFilterConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};
