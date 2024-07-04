"use server";

import { revalidatePath } from "next/cache";

import {
  createMyPage,
  deleteMyPage,
  updateMyPage,
} from "../api/myPages/mutations";
import {
  insertMyPageParams,
  MyPageId,
  myPageIdSchema,
  NewMyPageParams,
  UpdateMyPageParams,
  updateMyPageParams,
} from "../db/schema/myPages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMyPages = () => revalidatePath("/my-pages");

export const createMyPageAction = async (input: NewMyPageParams) => {
  try {
    const payload = insertMyPageParams.parse(input);
    await createMyPage(payload);
    revalidateMyPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMyPageAction = async (input: UpdateMyPageParams) => {
  try {
    const payload = updateMyPageParams.parse(input);
    await updateMyPage(payload.id, payload);
    revalidateMyPages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMyPageAction = async (input: MyPageId) => {
  try {
    const payload = myPageIdSchema.parse({ id: input });
    await deleteMyPage(payload.id);
    revalidateMyPages();
  } catch (e) {
    return handleErrors(e);
  }
};
