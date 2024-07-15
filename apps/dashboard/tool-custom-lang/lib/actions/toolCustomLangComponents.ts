"use server";

import { revalidatePath } from "next/cache";
import {
  createToolCustomLangComponent,
  deleteToolCustomLangComponent,
  updateToolCustomLangComponent,
} from "@/lib/api/toolCustomLangComponents/mutations";
import {
  ToolCustomLangComponentId,
  NewToolCustomLangComponentParams,
  UpdateToolCustomLangComponentParams,
  toolCustomLangComponentIdSchema,
  insertToolCustomLangComponentParams,
  updateToolCustomLangComponentParams,
} from "@/lib/db/schema/toolCustomLangComponents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolCustomLangComponents = () => revalidatePath("/tool-custom-lang-components");

export const createToolCustomLangComponentAction = async (input: NewToolCustomLangComponentParams) => {
  try {
    const payload = insertToolCustomLangComponentParams.parse(input);
    await createToolCustomLangComponent(payload);
    revalidateToolCustomLangComponents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolCustomLangComponentAction = async (input: UpdateToolCustomLangComponentParams) => {
  try {
    const payload = updateToolCustomLangComponentParams.parse(input);
    await updateToolCustomLangComponent(payload.id, payload);
    revalidateToolCustomLangComponents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolCustomLangComponentAction = async (input: ToolCustomLangComponentId) => {
  try {
    const payload = toolCustomLangComponentIdSchema.parse({ id: input });
    await deleteToolCustomLangComponent(payload.id);
    revalidateToolCustomLangComponents();
  } catch (e) {
    return handleErrors(e);
  }
};
