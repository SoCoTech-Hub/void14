import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AnalyticsUsedFileId, 
  type NewAnalyticsUsedFileParams,
  type UpdateAnalyticsUsedFileParams, 
  updateAnalyticsUsedFileSchema,
  insertAnalyticsUsedFileSchema, 
  analyticsUsedFiles,
  analyticsUsedFileIdSchema 
} from "@/lib/db/schema/analyticsUsedFiles";

export const createAnalyticsUsedFile = async (analyticsUsedFile: NewAnalyticsUsedFileParams) => {
  const newAnalyticsUsedFile = insertAnalyticsUsedFileSchema.parse(analyticsUsedFile);
  try {
    const [a] =  await db.insert(analyticsUsedFiles).values(newAnalyticsUsedFile).returning();
    return { analyticsUsedFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAnalyticsUsedFile = async (id: AnalyticsUsedFileId, analyticsUsedFile: UpdateAnalyticsUsedFileParams) => {
  const { id: analyticsUsedFileId } = analyticsUsedFileIdSchema.parse({ id });
  const newAnalyticsUsedFile = updateAnalyticsUsedFileSchema.parse(analyticsUsedFile);
  try {
    const [a] =  await db
     .update(analyticsUsedFiles)
     .set({...newAnalyticsUsedFile, updatedAt: new Date() })
     .where(eq(analyticsUsedFiles.id, analyticsUsedFileId!))
     .returning();
    return { analyticsUsedFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAnalyticsUsedFile = async (id: AnalyticsUsedFileId) => {
  const { id: analyticsUsedFileId } = analyticsUsedFileIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(analyticsUsedFiles).where(eq(analyticsUsedFiles.id, analyticsUsedFileId!))
    .returning();
    return { analyticsUsedFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

