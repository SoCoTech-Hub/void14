"use server";

import { revalidatePath } from "next/cache";
import {
  createDataRecord,
  deleteDataRecord,
  updateDataRecord,
} from "@/lib/api/dataRecords/mutations";
import {
  DataRecordId,
  NewDataRecordParams,
  UpdateDataRecordParams,
  dataRecordIdSchema,
  insertDataRecordParams,
  updateDataRecordParams,
} from "@/lib/db/schema/dataRecords";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDataRecords = () => revalidatePath("/data-records");

export const createDataRecordAction = async (input: NewDataRecordParams) => {
  try {
    const payload = insertDataRecordParams.parse(input);
    await createDataRecord(payload);
    revalidateDataRecords();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDataRecordAction = async (input: UpdateDataRecordParams) => {
  try {
    const payload = updateDataRecordParams.parse(input);
    await updateDataRecord(payload.id, payload);
    revalidateDataRecords();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDataRecordAction = async (input: DataRecordId) => {
  try {
    const payload = dataRecordIdSchema.parse({ id: input });
    await deleteDataRecord(payload.id);
    revalidateDataRecords();
  } catch (e) {
    return handleErrors(e);
  }
};
