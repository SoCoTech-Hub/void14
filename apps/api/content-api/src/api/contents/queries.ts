import { and, eq } from "drizzle-orm";

import type { ContentId } from "@soco/content-db/schema/contents";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/content-db/index";
import { contentIdSchema, contents } from "@soco/content-db/schema/contents";

export const getContents = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(contents)
    .where(eq(contents.userId, session?.user.id!));
  const c = rows;
  return { contents: c };
};

export const getContentById = async (id: ContentId) => {
  const { session } = await getUserAuth();
  const { id: contentId } = contentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(contents)
    .where(
      and(eq(contents.id, contentId), eq(contents.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const c = row;
  return { content: c };
};
