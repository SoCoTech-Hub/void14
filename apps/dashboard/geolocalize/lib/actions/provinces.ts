"use server";

import { revalidatePath } from "next/cache";
import {
  createProvince,
  deleteProvince,
  updateProvince,
} from "@/lib/api/provinces/mutations";
import {
  ProvinceId,
  NewProvinceParams,
  UpdateProvinceParams,
  provinceIdSchema,
  insertProvinceParams,
  updateProvinceParams,
} from "@/lib/db/schema/provinces";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateProvinces = () => revalidatePath("/provinces");

export const createProvinceAction = async (input: NewProvinceParams) => {
  try {
    const payload = insertProvinceParams.parse(input);
    await createProvince(payload);
    revalidateProvinces();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateProvinceAction = async (input: UpdateProvinceParams) => {
  try {
    const payload = updateProvinceParams.parse(input);
    await updateProvince(payload.id, payload);
    revalidateProvinces();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteProvinceAction = async (input: ProvinceId) => {
  try {
    const payload = provinceIdSchema.parse({ id: input });
    await deleteProvince(payload.id);
    revalidateProvinces();
  } catch (e) {
    return handleErrors(e);
  }
};