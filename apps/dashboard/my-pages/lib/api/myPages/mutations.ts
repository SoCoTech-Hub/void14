import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type MyPageId, 
  type NewMyPageParams,
  type UpdateMyPageParams, 
  updateMyPageSchema,
  insertMyPageSchema, 
  myPages,
  myPageIdSchema 
} from "@/lib/db/schema/myPages";
import { getUserAuth } from "@/lib/auth/utils";

export const createMyPage = async (myPage: NewMyPageParams) => {
  const { session } = await getUserAuth();
  const newMyPage = insertMyPageSchema.parse({ ...myPage, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(myPages).values(newMyPage).returning();
    return { myPage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMyPage = async (id: MyPageId, myPage: UpdateMyPageParams) => {
  const { session } = await getUserAuth();
  const { id: myPageId } = myPageIdSchema.parse({ id });
  const newMyPage = updateMyPageSchema.parse({ ...myPage, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(myPages)
     .set(newMyPage)
     .where(and(eq(myPages.id, myPageId!), eq(myPages.userId, session?.user.id!)))
     .returning();
    return { myPage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMyPage = async (id: MyPageId) => {
  const { session } = await getUserAuth();
  const { id: myPageId } = myPageIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(myPages).where(and(eq(myPages.id, myPageId!), eq(myPages.userId, session?.user.id!)))
    .returning();
    return { myPage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

