import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertUserInfoFieldSchema,
  NewUserInfoFieldParams,
  UpdateUserInfoFieldParams,
  updateUserInfoFieldSchema,
  UserInfoFieldId,
  userInfoFieldIdSchema,
  userInfoFields,
} from "../../db/schema/userInfoFields";

export const createUserInfoField = async (
  userInfoField: NewUserInfoFieldParams,
) => {
  const newUserInfoField = insertUserInfoFieldSchema.parse(userInfoField);
  try {
    const [u] = await db
      .insert(userInfoFields)
      .values(newUserInfoField)
      .returning();
    return { userInfoField: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserInfoField = async (
  id: UserInfoFieldId,
  userInfoField: UpdateUserInfoFieldParams,
) => {
  const { id: userInfoFieldId } = userInfoFieldIdSchema.parse({ id });
  const newUserInfoField = updateUserInfoFieldSchema.parse(userInfoField);
  try {
    const [u] = await db
      .update(userInfoFields)
      .set(newUserInfoField)
      .where(eq(userInfoFields.id, userInfoFieldId!))
      .returning();
    return { userInfoField: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserInfoField = async (id: UserInfoFieldId) => {
  const { id: userInfoFieldId } = userInfoFieldIdSchema.parse({ id });
  try {
    const [u] = await db
      .delete(userInfoFields)
      .where(eq(userInfoFields.id, userInfoFieldId!))
      .returning();
    return { userInfoField: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
