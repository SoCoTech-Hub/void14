import { eq } from "drizzle-orm";

import type { UrlId } from "../../db/schema/urls";
import { db } from "../../db/index";
import { urlIdSchema, urls } from "../../db/schema/urls";

export const getUrls = async () => {
  const rows = await db.select().from(urls);
  const u = rows;
  return { urls: u };
};

export const getUrlById = async (id: UrlId) => {
  const { id: urlId } = urlIdSchema.parse({ id });
  const [row] = await db.select().from(urls).where(eq(urls.id, urlId));
  if (row === undefined) return {};
  const u = row;
  return { url: u };
};
