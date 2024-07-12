import { db } from "@soco/url-db/client";
import { eq } from "@soco/url-db";
import { 
  type UrlId, 
  type NewUrlParams,
  type UpdateUrlParams, 
  updateUrlSchema,
  insertUrlSchema, 
  urls,
  urlIdSchema 
} from "@soco/url-db/schema/urls";

export const createUrl = async (url: NewUrlParams) => {
  const newUrl = insertUrlSchema.parse(url);
  try {
    const [u] =  await db.insert(urls).values(newUrl).returning();
    return { url: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUrl = async (id: UrlId, url: UpdateUrlParams) => {
  const { id: urlId } = urlIdSchema.parse({ id });
  const newUrl = updateUrlSchema.parse(url);
  try {
    const [u] =  await db
     .update(urls)
     .set({...newUrl, updatedAt: new Date() })
     .where(eq(urls.id, urlId!))
     .returning();
    return { url: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUrl = async (id: UrlId) => {
  const { id: urlId } = urlIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(urls).where(eq(urls.id, urlId!))
    .returning();
    return { url: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

