"use server";

import { revalidatePath } from "next/cache";
import {
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "@/lib/api/districts/mutations";
import {
  DistrictId,
  NewDistrictParams,
  UpdateDistrictParams,
  districtIdSchema,
  insertDistrictParams,
  updateDistrictParams,
} from "@/lib/db/schema/districts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDistricts = () => revalidatePath("/districts");

export const createDistrictAction = async (input: NewDistrictParams) => {
  try {
    const payload = insertDistrictParams.parse(input);
    await createDistrict(payload);
    revalidateDistricts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDistrictAction = async (input: UpdateDistrictParams) => {
  try {
    const payload = updateDistrictParams.parse(input);
    await updateDistrict(payload.id, payload);
    revalidateDistricts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDistrictAction = async (input: DistrictId) => {
  try {
    const payload = districtIdSchema.parse({ id: input });
    await deleteDistrict(payload.id);
    revalidateDistricts();
  } catch (e) {
    return handleErrors(e);
  }
};
