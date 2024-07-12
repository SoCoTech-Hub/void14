import { db } from "@soco/tool-data-privacy-db/client";
import { and, eq } from "@soco/tool-data-privacy-db";
import { 
  type ToolDataprivacyCategoryId, 
  type NewToolDataprivacyCategoryParams,
  type UpdateToolDataprivacyCategoryParams, 
  updateToolDataprivacyCategorySchema,
  insertToolDataprivacyCategorySchema, 
  toolDataprivacyCategories,
  toolDataprivacyCategoryIdSchema 
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCategories";
import { getUserAuth } from "@soco/auth-service";

export const createToolDataprivacyCategory = async (toolDataprivacyCategory: NewToolDataprivacyCategoryParams) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyCategory = insertToolDataprivacyCategorySchema.parse({ ...toolDataprivacyCategory, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolDataprivacyCategories).values(newToolDataprivacyCategory).returning();
    return { toolDataprivacyCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyCategory = async (id: ToolDataprivacyCategoryId, toolDataprivacyCategory: UpdateToolDataprivacyCategoryParams) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCategoryId } = toolDataprivacyCategoryIdSchema.parse({ id });
  const newToolDataprivacyCategory = updateToolDataprivacyCategorySchema.parse({ ...toolDataprivacyCategory, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolDataprivacyCategories)
     .set({...newToolDataprivacyCategory, updatedAt: new Date() })
     .where(and(eq(toolDataprivacyCategories.id, toolDataprivacyCategoryId!), eq(toolDataprivacyCategories.userId, session?.user.id!)))
     .returning();
    return { toolDataprivacyCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyCategory = async (id: ToolDataprivacyCategoryId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCategoryId } = toolDataprivacyCategoryIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolDataprivacyCategories).where(and(eq(toolDataprivacyCategories.id, toolDataprivacyCategoryId!), eq(toolDataprivacyCategories.userId, session?.user.id!)))
    .returning();
    return { toolDataprivacyCategory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

