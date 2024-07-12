import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type FilesReferenceId, 
  type NewFilesReferenceParams,
  type UpdateFilesReferenceParams, 
  updateFilesReferenceSchema,
  insertFilesReferenceSchema, 
  filesReferences,
  filesReferenceIdSchema 
} from "@/lib/db/schema/filesReferences";

export const createFilesReference = async (filesReference: NewFilesReferenceParams) => {
  const newFilesReference = insertFilesReferenceSchema.parse(filesReference);
  try {
    const [f] =  await db.insert(filesReferences).values(newFilesReference).returning();
    return { filesReference: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateFilesReference = async (id: FilesReferenceId, filesReference: UpdateFilesReferenceParams) => {
  const { id: filesReferenceId } = filesReferenceIdSchema.parse({ id });
  const newFilesReference = updateFilesReferenceSchema.parse(filesReference);
  try {
    const [f] =  await db
     .update(filesReferences)
     .set(newFilesReference)
     .where(eq(filesReferences.id, filesReferenceId!))
     .returning();
    return { filesReference: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteFilesReference = async (id: FilesReferenceId) => {
  const { id: filesReferenceId } = filesReferenceIdSchema.parse({ id });
  try {
    const [f] =  await db.delete(filesReferences).where(eq(filesReferences.id, filesReferenceId!))
    .returning();
    return { filesReference: f };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

