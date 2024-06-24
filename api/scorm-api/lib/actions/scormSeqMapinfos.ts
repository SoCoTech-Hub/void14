"use server";

import { revalidatePath } from "next/cache";
import {
  createScormSeqMapinfo,
  deleteScormSeqMapinfo,
  updateScormSeqMapinfo,
} from "@/lib/api/scormSeqMapinfos/mutations";
import {
  ScormSeqMapinfoId,
  NewScormSeqMapinfoParams,
  UpdateScormSeqMapinfoParams,
  scormSeqMapinfoIdSchema,
  insertScormSeqMapinfoParams,
  updateScormSeqMapinfoParams,
} from "@/lib/db/schema/scormSeqMapinfos";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqMapinfos = () => revalidatePath("/scorm-seq-mapinfos");

export const createScormSeqMapinfoAction = async (input: NewScormSeqMapinfoParams) => {
  try {
    const payload = insertScormSeqMapinfoParams.parse(input);
    await createScormSeqMapinfo(payload);
    revalidateScormSeqMapinfos();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqMapinfoAction = async (input: UpdateScormSeqMapinfoParams) => {
  try {
    const payload = updateScormSeqMapinfoParams.parse(input);
    await updateScormSeqMapinfo(payload.id, payload);
    revalidateScormSeqMapinfos();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqMapinfoAction = async (input: ScormSeqMapinfoId) => {
  try {
    const payload = scormSeqMapinfoIdSchema.parse({ id: input });
    await deleteScormSeqMapinfo(payload.id);
    revalidateScormSeqMapinfos();
  } catch (e) {
    return handleErrors(e);
  }
};