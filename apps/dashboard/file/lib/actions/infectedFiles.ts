"use server";

import { revalidatePath } from "next/cache";
import {
  createInfectedFile,
  deleteInfectedFile,
  updateInfectedFile,
} from "@/lib/api/infectedFiles/mutations";
import {
  InfectedFileId,
  NewInfectedFileParams,
  UpdateInfectedFileParams,
  infectedFileIdSchema,
  insertInfectedFileParams,
  updateInfectedFileParams,
} from "@/lib/db/schema/infectedFiles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateInfectedFiles = () => revalidatePath("/infected-files");

export const createInfectedFileAction = async (input: NewInfectedFileParams) => {
  try {
    const payload = insertInfectedFileParams.parse(input);
    await createInfectedFile(payload);
    revalidateInfectedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateInfectedFileAction = async (input: UpdateInfectedFileParams) => {
  try {
    const payload = updateInfectedFileParams.parse(input);
    await updateInfectedFile(payload.id, payload);
    revalidateInfectedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteInfectedFileAction = async (input: InfectedFileId) => {
  try {
    const payload = infectedFileIdSchema.parse({ id: input });
    await deleteInfectedFile(payload.id);
    revalidateInfectedFiles();
  } catch (e) {
    return handleErrors(e);
  }
};
