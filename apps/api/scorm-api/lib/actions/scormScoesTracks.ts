"use server";

import { revalidatePath } from "next/cache";
import {
  createScormScoesTrack,
  deleteScormScoesTrack,
  updateScormScoesTrack,
} from "@/lib/api/scormScoesTracks/mutations";
import {
  ScormScoesTrackId,
  NewScormScoesTrackParams,
  UpdateScormScoesTrackParams,
  scormScoesTrackIdSchema,
  insertScormScoesTrackParams,
  updateScormScoesTrackParams,
} from "@/lib/db/schema/scormScoesTracks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormScoesTracks = () => revalidatePath("/scorm-scoes-tracks");

export const createScormScoesTrackAction = async (input: NewScormScoesTrackParams) => {
  try {
    const payload = insertScormScoesTrackParams.parse(input);
    await createScormScoesTrack(payload);
    revalidateScormScoesTracks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormScoesTrackAction = async (input: UpdateScormScoesTrackParams) => {
  try {
    const payload = updateScormScoesTrackParams.parse(input);
    await updateScormScoesTrack(payload.id, payload);
    revalidateScormScoesTracks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormScoesTrackAction = async (input: ScormScoesTrackId) => {
  try {
    const payload = scormScoesTrackIdSchema.parse({ id: input });
    await deleteScormScoesTrack(payload.id);
    revalidateScormScoesTracks();
  } catch (e) {
    return handleErrors(e);
  }
};