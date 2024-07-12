import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type UserInfoCategoryId, 
  type NewUserInfoCategoryParams,
  type UpdateUserInfoCategoryParams, 
  updateUserInfoCategorySchema,
  insertUserInfoCategorySchema, 
  userInfoCategories,
  userInfoCategoryIdSchema 
} from "@/lib/db/schema/userInfoCategories";

export const createUserInfoCategory = async (userInfoCategory: NewUserInfoCategoryParams) => {
  const newUserInfoCategory = insertUserInfoCategorySchema.parse(userInfoCategory);
  try {
    const [u] =  await db.insert(userInfoCategories).values(newUserInfoCategory).returning();
    return { userInfoCategory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserInfoCategory = async (id: UserInfoCategoryId, userInfoCategory: UpdateUserInfoCategoryParams) => {
  const { id: userInfoCategoryId } = userInfoCategoryIdSchema.parse({ id });
  const newUserInfoCategory = updateUserInfoCategorySchema.parse(userInfoCategory);
  try {
    const [u] =  await db
     .update(userInfoCategories)
     .set(newUserInfoCategory)
     .where(eq(userInfoCategories.id, userInfoCategoryId!))
     .returning();
    return { userInfoCategory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserInfoCategory = async (id: UserInfoCategoryId) => {
  const { id: userInfoCategoryId } = userInfoCategoryIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(userInfoCategories).where(eq(userInfoCategories.id, userInfoCategoryId!))
    .returning();
    return { userInfoCategory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

