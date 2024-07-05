import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MyPageId } from "../../db/schema/myPages";
import { db } from "../../db/index";
import { myPageIdSchema, myPages } from "../../db/schema/myPages";

export const getMyPages = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(myPages)
    .where(eq(myPages.userId, session?.user.id!));
  const m = rows;
  return { myPages: m };
};

export const getMyPageById = async (id: MyPageId) => {
  const { session } = await getUserAuth();
  const { id: myPageId } = myPageIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(myPages)
    .where(
      and(eq(myPages.id, myPageId), eq(myPages.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const m = row;
  return { myPage: m };
};
