"use server";

import { revalidatePath } from "next/cache";
import {
  createFilterActive,
  deleteFilterActive,
  updateFilterActive,
} from "@/lib/api/filterActives/mutations";
import {
  FilterActiveId,
  NewFilterActiveParams,
  UpdateFilterActiveParams,
  filterActiveIdSchema,
  insertFilterActiveParams,
  updateFilterActiveParams,
} from "@/lib/db/schema/filterActives";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFilterActives = () => revalidatePath("/filter-actives");

export const createFilterActiveAction = async (input: NewFilterActiveParams) => {
  try {
    const payload = insertFilterActiveParams.parse(input);
    await createFilterActive(payload);
    revalidateFilterActives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFilterActiveAction = async (input: UpdateFilterActiveParams) => {
  try {
    const payload = updateFilterActiveParams.parse(input);
    await updateFilterActive(payload.id, payload);
    revalidateFilterActives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFilterActiveAction = async (input: FilterActiveId) => {
  try {
    const payload = filterActiveIdSchema.parse({ id: input });
    await deleteFilterActive(payload.id);
    revalidateFilterActives();
  } catch (e) {
    return handleErrors(e);
  }
};
