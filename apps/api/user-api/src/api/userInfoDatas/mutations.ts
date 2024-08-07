import type {
  NewUserInfoDataParams,
  UpdateUserInfoDataParams,
  UserInfoDataId,
} from "@soco/user-db/schema/userInfoDatas";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  insertUserInfoDataSchema,
  updateUserInfoDataSchema,
  userInfoDataIdSchema,
  userInfoDatas,
} from "@soco/user-db/schema/userInfoDatas";

export const createUserInfoData = async (
  userInfoData: NewUserInfoDataParams,
) => {
  const { session } = await getUserAuth();
  const newUserInfoData = insertUserInfoDataSchema.parse({
    ...userInfoData,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .insert(userInfoDatas)
      .values(newUserInfoData)
      .returning();
    return { userInfoData: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserInfoData = async (
  id: UserInfoDataId,
  userInfoData: UpdateUserInfoDataParams,
) => {
  const { session } = await getUserAuth();
  const { id: userInfoDataId } = userInfoDataIdSchema.parse({ id });
  const newUserInfoData = updateUserInfoDataSchema.parse({
    ...userInfoData,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userInfoDatas)
      .set(newUserInfoData)
      .where(
        and(
          eq(userInfoDatas.id, userInfoDataId!),
          eq(userInfoDatas.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userInfoData: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserInfoData = async (id: UserInfoDataId) => {
  const { session } = await getUserAuth();
  const { id: userInfoDataId } = userInfoDataIdSchema.parse({ id });
  try {
    const [u] = await db
      .delete(userInfoDatas)
      .where(
        and(
          eq(userInfoDatas.id, userInfoDataId!),
          eq(userInfoDatas.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userInfoData: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
