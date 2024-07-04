"use server";

import { revalidatePath } from "next/cache";

import {
  createEditorAttoAutosave,
  deleteEditorAttoAutosave,
  updateEditorAttoAutosave,
} from "../api/editorAttoAutosaves/mutations";
import {
  EditorAttoAutosaveId,
  editorAttoAutosaveIdSchema,
  insertEditorAttoAutosaveParams,
  NewEditorAttoAutosaveParams,
  UpdateEditorAttoAutosaveParams,
  updateEditorAttoAutosaveParams,
} from "../db/schema/editorAttoAutosaves";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEditorAttoAutosaves = () =>
  revalidatePath("/editor-atto-autosaves");

export const createEditorAttoAutosaveAction = async (
  input: NewEditorAttoAutosaveParams,
) => {
  try {
    const payload = insertEditorAttoAutosaveParams.parse(input);
    await createEditorAttoAutosave(payload);
    revalidateEditorAttoAutosaves();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEditorAttoAutosaveAction = async (
  input: UpdateEditorAttoAutosaveParams,
) => {
  try {
    const payload = updateEditorAttoAutosaveParams.parse(input);
    await updateEditorAttoAutosave(payload.id, payload);
    revalidateEditorAttoAutosaves();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEditorAttoAutosaveAction = async (
  input: EditorAttoAutosaveId,
) => {
  try {
    const payload = editorAttoAutosaveIdSchema.parse({ id: input });
    await deleteEditorAttoAutosave(payload.id);
    revalidateEditorAttoAutosaves();
  } catch (e) {
    return handleErrors(e);
  }
};
