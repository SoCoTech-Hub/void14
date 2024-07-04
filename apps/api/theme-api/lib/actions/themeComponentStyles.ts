"use server";

import { revalidatePath } from "next/cache";

import {
  createThemeComponentStyle,
  deleteThemeComponentStyle,
  updateThemeComponentStyle,
} from "../api/themeComponentStyles/mutations";
import {
  insertThemeComponentStyleParams,
  NewThemeComponentStyleParams,
  ThemeComponentStyleId,
  themeComponentStyleIdSchema,
  UpdateThemeComponentStyleParams,
  updateThemeComponentStyleParams,
} from "../db/schema/themeComponentStyles";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateThemeComponentStyles = () =>
  revalidatePath("/theme-component-styles");

export const createThemeComponentStyleAction = async (
  input: NewThemeComponentStyleParams,
) => {
  try {
    const payload = insertThemeComponentStyleParams.parse(input);
    await createThemeComponentStyle(payload);
    revalidateThemeComponentStyles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateThemeComponentStyleAction = async (
  input: UpdateThemeComponentStyleParams,
) => {
  try {
    const payload = updateThemeComponentStyleParams.parse(input);
    await updateThemeComponentStyle(payload.id, payload);
    revalidateThemeComponentStyles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteThemeComponentStyleAction = async (
  input: ThemeComponentStyleId,
) => {
  try {
    const payload = themeComponentStyleIdSchema.parse({ id: input });
    await deleteThemeComponentStyle(payload.id);
    revalidateThemeComponentStyles();
  } catch (e) {
    return handleErrors(e);
  }
};
