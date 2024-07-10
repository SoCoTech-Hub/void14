import { db } from "@soco/user-db/client";
import { eq } from "@soco/user-db";
import { type UserInfoCategoryId, userInfoCategoryIdSchema, userInfoCategories } from "@soco/user-db/schema/userInfoCategories";

export const getUserInfoCategories = async () => {
  const rows = await db.select().from(userInfoCategories);
  const u = rows
  return { userInfoCategories: u };
};

export const getUserInfoCategoryById = async (id: UserInfoCategoryId) => {
  const { id: userInfoCategoryId } = userInfoCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(userInfoCategories).where(eq(userInfoCategories.id, userInfoCategoryId));
  if (row === undefined) return {};
  const u = row;
  return { userInfoCategory: u };
};


