import { eq } from "drizzle-orm";

import type { PageId } from "../../db/schema/pages";
import { db } from "../../db/index";
import { pageIdSchema, pages } from "../../db/schema/pages";

export const getPages = async () => {
  const rows = await db.select().from(pages);
  const p = rows;
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const [row] = await db.select().from(pages).where(eq(pages.id, pageId));
  if (row === undefined) return {};
  const p = row;
  return { page: p };
};
