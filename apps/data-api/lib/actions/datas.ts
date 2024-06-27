"use server";

import { revalidatePath } from "next/cache";
import {
  createData,
  deleteData,
  updateData,
} from "@/lib/api/datas/mutations";
import {
  DataId,
  NewDataParams,
  UpdateDataParams,
  dataIdSchema,
  insertDataParams,
  updateDataParams,
} from "@/lib/db/schema/datas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDatas = () => revalidatePath("/datas");

export const createDataAction = async (input: NewDataParams) => {
  try {
    const payload = insertDataParams.parse(input);
    await createData(payload);
    revalidateDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDataAction = async (input: UpdateDataParams) => {
  try {
    const payload = updateDataParams.parse(input);
    await updateData(payload.id, payload);
    revalidateDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDataAction = async (input: DataId) => {
  try {
    const payload = dataIdSchema.parse({ id: input });
    await deleteData(payload.id);
    revalidateDatas();
  } catch (e) {
    return handleErrors(e);
  }
};