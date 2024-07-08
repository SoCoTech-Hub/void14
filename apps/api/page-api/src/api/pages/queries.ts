import { db } from "@soco/page-db/index";
import { eq } from "drizzle-orm";
import { type PageId, pageIdSchema, pages } from "@soco/page-db/schema/pages";

export const getPages = async () => {
  const rows = await db.select().from(pages);
  const p = rows
  return { pages: p };
};

export const getPageById = async (id: PageId) => {
  const { id: pageId } = pageIdSchema.parse({ id });
  const [row] = await db.select().from(pages).where(eq(pages.id, pageId));
  if (row === undefined) return {};
  const p = row;
  return { page: p };
};


