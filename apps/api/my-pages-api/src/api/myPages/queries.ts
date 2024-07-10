import { db } from "@soco/my-pages-db/client";
import { eq, and } from "@soco/my-pages-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type MyPageId, myPageIdSchema, myPages } from "@soco/my-pages-db/schema/myPages";

export const getMyPages = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(myPages).where(eq(myPages.userId, session?.user.id!));
  const m = rows
  return { myPages: m };
};

export const getMyPageById = async (id: MyPageId) => {
  const { session } = await getUserAuth();
  const { id: myPageId } = myPageIdSchema.parse({ id });
  const [row] = await db.select().from(myPages).where(and(eq(myPages.id, myPageId), eq(myPages.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { myPage: m };
};


