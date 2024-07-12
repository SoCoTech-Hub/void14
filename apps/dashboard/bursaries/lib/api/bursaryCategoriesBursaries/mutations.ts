import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BursaryCategoriesBursaryId, 
  type NewBursaryCategoriesBursaryParams,
  type UpdateBursaryCategoriesBursaryParams, 
  updateBursaryCategoriesBursarySchema,
  insertBursaryCategoriesBursarySchema, 
  bursaryCategoriesBursaries,
  bursaryCategoriesBursaryIdSchema 
} from "@/lib/db/schema/bursaryCategoriesBursaries";

export const createBursaryCategoriesBursary = async (bursaryCategoriesBursary: NewBursaryCategoriesBursaryParams) => {
  const newBursaryCategoriesBursary = insertBursaryCategoriesBursarySchema.parse(bursaryCategoriesBursary);
  try {
    const [b] =  await db.insert(bursaryCategoriesBursaries).values(newBursaryCategoriesBursary).returning();
    return { bursaryCategoriesBursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBursaryCategoriesBursary = async (id: BursaryCategoriesBursaryId, bursaryCategoriesBursary: UpdateBursaryCategoriesBursaryParams) => {
  const { id: bursaryCategoriesBursaryId } = bursaryCategoriesBursaryIdSchema.parse({ id });
  const newBursaryCategoriesBursary = updateBursaryCategoriesBursarySchema.parse(bursaryCategoriesBursary);
  try {
    const [b] =  await db
     .update(bursaryCategoriesBursaries)
     .set(newBursaryCategoriesBursary)
     .where(eq(bursaryCategoriesBursaries.id, bursaryCategoriesBursaryId!))
     .returning();
    return { bursaryCategoriesBursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBursaryCategoriesBursary = async (id: BursaryCategoriesBursaryId) => {
  const { id: bursaryCategoriesBursaryId } = bursaryCategoriesBursaryIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(bursaryCategoriesBursaries).where(eq(bursaryCategoriesBursaries.id, bursaryCategoriesBursaryId!))
    .returning();
    return { bursaryCategoriesBursary: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

