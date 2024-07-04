"use server";

import { revalidatePath } from "next/cache";

import {
  createScormSeqObjective,
  deleteScormSeqObjective,
  updateScormSeqObjective,
} from "../api/scormSeqObjectives/mutations";
import {
  insertScormSeqObjectiveParams,
  NewScormSeqObjectiveParams,
  ScormSeqObjectiveId,
  scormSeqObjectiveIdSchema,
  UpdateScormSeqObjectiveParams,
  updateScormSeqObjectiveParams,
} from "../db/schema/scormSeqObjectives";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqObjectives = () =>
  revalidatePath("/scorm-seq-objectives");

export const createScormSeqObjectiveAction = async (
  input: NewScormSeqObjectiveParams,
) => {
  try {
    const payload = insertScormSeqObjectiveParams.parse(input);
    await createScormSeqObjective(payload);
    revalidateScormSeqObjectives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqObjectiveAction = async (
  input: UpdateScormSeqObjectiveParams,
) => {
  try {
    const payload = updateScormSeqObjectiveParams.parse(input);
    await updateScormSeqObjective(payload.id, payload);
    revalidateScormSeqObjectives();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqObjectiveAction = async (
  input: ScormSeqObjectiveId,
) => {
  try {
    const payload = scormSeqObjectiveIdSchema.parse({ id: input });
    await deleteScormSeqObjective(payload.id);
    revalidateScormSeqObjectives();
  } catch (e) {
    return handleErrors(e);
  }
};
