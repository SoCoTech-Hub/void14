import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { BlogExternalId } from "../db/schema/blogExternals";
import { db } from "../db/index";
import {
  blogExternalIdSchema,
  blogExternals,
} from "../db/schema/blogExternals";

export const getBlogExternals = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(blogExternals)
    .where(eq(blogExternals.userId, session?.user.id!));
  const b = rows;
  return { blogExternals: b };
};

export const getBlogExternalById = async (id: BlogExternalId) => {
  const { session } = await getUserAuth();
  const { id: blogExternalId } = blogExternalIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(blogExternals)
    .where(
      and(
        eq(blogExternals.id, blogExternalId),
        eq(blogExternals.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { blogExternal: b };
};
