import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type FileConversionId, 
  type NewFileConversionParams,
  type UpdateFileConversionParams, 
  updateFileConversionSchema,
  insertFileConversionSchema, 
  fileConversions,
  fileConversionIdSchema 
} from "@/lib/db/schema/fileConversions";
import { getUserAuth } from "@/lib/auth/utils";

export const createFileConversion = async (fileConversion: NewFileConversionParams) => {
  const { session } = await getUserAuth();
  const newFileConversion = insertFileConversionSchema.parse({ ...fileConversion, userId: session?.user.id! });
  try {
    const [f] =  await db.insert(fileConversions).values(newFileConversion).returning();
    return { fileConversion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFileConversion = async (id: FileConversionId, fileConversion: UpdateFileConversionParams) => {
  const { session } = await getUserAuth();
  const { id: fileConversionId } = fileConversionIdSchema.parse({ id });
  const newFileConversion = updateFileConversionSchema.parse({ ...fileConversion, userId: session?.user.id! });
  try {
    const [f] =  await db
     .update(fileConversions)
     .set({...newFileConversion, updatedAt: new Date() })
     .where(and(eq(fileConversions.id, fileConversionId!), eq(fileConversions.userId, session?.user.id!)))
     .returning();
    return { fileConversion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFileConversion = async (id: FileConversionId) => {
  const { session } = await getUserAuth();
  const { id: fileConversionId } = fileConversionIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(fileConversions).where(and(eq(fileConversions.id, fileConversionId!), eq(fileConversions.userId, session?.user.id!)))
    .returning();
    return { fileConversion: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

