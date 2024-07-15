"use server";

import { revalidatePath } from "next/cache";
import {
  createTheme,
  deleteTheme,
  updateTheme,
} from "@/lib/api/themes/mutations";
import {
  ThemeId,
  NewThemeParams,
  UpdateThemeParams,
  themeIdSchema,
  insertThemeParams,
  updateThemeParams,
} from "@/lib/db/schema/themes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateThemes = () => revalidatePath("/themes");

export const createThemeAction = async (input: NewThemeParams) => {
  try {
    const payload = insertThemeParams.parse(input);
    await createTheme(payload);
    revalidateThemes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateThemeAction = async (input: UpdateThemeParams) => {
  try {
    const payload = updateThemeParams.parse(input);
    await updateTheme(payload.id, payload);
    revalidateThemes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteThemeAction = async (input: ThemeId) => {
  try {
    const payload = themeIdSchema.parse({ id: input });
    await deleteTheme(payload.id);
    revalidateThemes();
  } catch (e) {
    return handleErrors(e);
  }
};
