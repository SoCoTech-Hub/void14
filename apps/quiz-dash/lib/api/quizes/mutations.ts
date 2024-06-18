import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuizeId, 
  NewQuizeParams,
  UpdateQuizeParams, 
  updateQuizeSchema,
  insertQuizeSchema, 
  quizes,
  quizeIdSchema 
} from "@/lib/db/schema/quizes";

export const createQuize = async (quize: NewQuizeParams) => {
  const newQuize = insertQuizeSchema.parse(quize);
  try {
    const [q] =  await db.insert(quizes).values(newQuize).returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuize = async (id: QuizeId, quize: UpdateQuizeParams) => {
  const { id: quizeId } = quizeIdSchema.parse({ id });
  const newQuize = updateQuizeSchema.parse(quize);
  try {
    const [q] =  await db
     .update(quizes)
     .set({...newQuize, updatedAt: new Date() })
     .where(eq(quizes.id, quizeId!))
     .returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuize = async (id: QuizeId) => {
  const { id: quizeId } = quizeIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizes).where(eq(quizes.id, quizeId!))
    .returning();
    return { quize: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

