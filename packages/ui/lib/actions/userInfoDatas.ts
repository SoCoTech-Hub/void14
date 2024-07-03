"use server";

import { revalidatePath } from "next/cache";
import {
  createUserInfoData,
  deleteUserInfoData,
  updateUserInfoData,
} from "@/lib/api/userInfoDatas/mutations";
import {
  UserInfoDataId,
  NewUserInfoDataParams,
  UpdateUserInfoDataParams,
  userInfoDataIdSchema,
  insertUserInfoDataParams,
  updateUserInfoDataParams,
} from "@/lib/db/schema/userInfoDatas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserInfoDatas = () => revalidatePath("/user-info-datas");

export const createUserInfoDataAction = async (input: NewUserInfoDataParams) => {
  try {
    const payload = insertUserInfoDataParams.parse(input);
    await createUserInfoData(payload);
    revalidateUserInfoDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserInfoDataAction = async (input: UpdateUserInfoDataParams) => {
  try {
    const payload = updateUserInfoDataParams.parse(input);
    await updateUserInfoData(payload.id, payload);
    revalidateUserInfoDatas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserInfoDataAction = async (input: UserInfoDataId) => {
  try {
    const payload = userInfoDataIdSchema.parse({ id: input });
    await deleteUserInfoData(payload.id);
    revalidateUserInfoDatas();
  } catch (e) {
    return handleErrors(e);
  }
};