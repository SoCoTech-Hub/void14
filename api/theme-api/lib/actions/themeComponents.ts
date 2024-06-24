"use server";

import { revalidatePath } from "next/cache";
import {
  createThemeComponent,
  deleteThemeComponent,
  updateThemeComponent,
} from "@/lib/api/themeComponents/mutations";
import {
  ThemeComponentId,
  NewThemeComponentParams,
  UpdateThemeComponentParams,
  themeComponentIdSchema,
  insertThemeComponentParams,
  updateThemeComponentParams,
} from "@/lib/db/schema/themeComponents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateThemeComponents = () => revalidatePath("/theme-components");

export const createThemeComponentAction = async (input: NewThemeComponentParams) => {
  try {
    const payload = insertThemeComponentParams.parse(input);
    await createThemeComponent(payload);
    revalidateThemeComponents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateThemeComponentAction = async (input: UpdateThemeComponentParams) => {
  try {
    const payload = updateThemeComponentParams.parse(input);
    await updateThemeComponent(payload.id, payload);
    revalidateThemeComponents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteThemeComponentAction = async (input: ThemeComponentId) => {
  try {
    const payload = themeComponentIdSchema.parse({ id: input });
    await deleteThemeComponent(payload.id);
    revalidateThemeComponents();
  } catch (e) {
    return handleErrors(e);
  }
};