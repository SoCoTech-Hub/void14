import { db } from "@soco/context-db/client";
import { eq } from "@soco/context-db";
import { 
  ContextId, 
  NewContextParams,
  UpdateContextParams, 
  updateContextSchema,
  insertContextSchema, 
  contexts,
  contextIdSchema 
} from "@soco/context-db/schema/contexts";

export const createContext = async (context: NewContextParams) => {
  const newContext = insertContextSchema.parse(context);
  try {
    const [c] =  await db.insert(contexts).values(newContext).returning();
    return { context: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateContext = async (id: ContextId, context: UpdateContextParams) => {
  const { id: contextId } = contextIdSchema.parse({ id });
  const newContext = updateContextSchema.parse(context);
  try {
    const [c] =  await db
     .update(contexts)
     .set(newContext)
     .where(eq(contexts.id, contextId!))
     .returning();
    return { context: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteContext = async (id: ContextId) => {
  const { id: contextId } = contextIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(contexts).where(eq(contexts.id, contextId!))
    .returning();
    return { context: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

