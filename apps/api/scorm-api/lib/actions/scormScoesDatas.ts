"use server";

import { revalidatePath } from "next/cache";

import {
  createScormScoesData,
  deleteScormScoesData,
  updateScormScoesData,
} from "../api/scormScoesDatas/mutations";
import {
  insertScormScoesDataParams,
  NewScormScoesDataParams,
  ScormScoesDataId,
  scormScoesDataIdSchema,
  UpdateScormScoesDataParams,
  updateScormScoesDataParams,
} from "../db/schema/scormScoesDatas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormScoesDatas = () => revalidatePath("/scorm-scoes-datas");

export const createScormScoesDataAction = async (
  input: NewScormScoesDataParams,
) => {
  try {
    const payload = insertScormScoesDataParams.parse(input);
    await createScormScoesData(payload);
    revalidateScormScoesDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormScoesDataAction = async (
  input: UpdateScormScoesDataParams,
) => {
  try {
    const payload = updateScormScoesDataParams.parse(input);
    await updateScormScoesData(payload.id, payload);
    revalidateScormScoesDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormScoesDataAction = async (input: ScormScoesDataId) => {
  try {
    const payload = scormScoesDataIdSchema.parse({ id: input });
    await deleteScormScoesData(payload.id);
    revalidateScormScoesDatas();
  } catch (e) {
    return handleErrors(e);
  }
};
