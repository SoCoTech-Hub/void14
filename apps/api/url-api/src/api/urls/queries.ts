import type { UrlId } from "@soco/url-db/schema/urls";
import { eq } from "@soco/url-db";
import { db } from "@soco/url-db/client";
import { urlIdSchema, urls } from "@soco/url-db/schema/urls";

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
