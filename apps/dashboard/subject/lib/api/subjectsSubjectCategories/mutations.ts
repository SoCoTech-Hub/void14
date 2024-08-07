import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type SubjectsSubjectCategoryId, 
  type NewSubjectsSubjectCategoryParams,
  type UpdateSubjectsSubjectCategoryParams, 
  updateSubjectsSubjectCategorySchema,
  insertSubjectsSubjectCategorySchema, 
  subjectsSubjectCategories,
  subjectsSubjectCategoryIdSchema 
} from "@/lib/db/schema/subjectsSubjectCategories";

export const createSubjectsSubjectCategory = async (subjectsSubjectCategory: NewSubjectsSubjectCategoryParams) => {
  const newSubjectsSubjectCategory = insertSubjectsSubjectCategorySchema.parse(subjectsSubjectCategory);
  try {
    const [s] =  await db.insert(subjectsSubjectCategories).values(newSubjectsSubjectCategory).returning();
    return { subjectsSubjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubjectsSubjectCategory = async (id: SubjectsSubjectCategoryId, subjectsSubjectCategory: UpdateSubjectsSubjectCategoryParams) => {
  const { id: subjectsSubjectCategoryId } = subjectsSubjectCategoryIdSchema.parse({ id });
  const newSubjectsSubjectCategory = updateSubjectsSubjectCategorySchema.parse(subjectsSubjectCategory);
  try {
    const [s] =  await db
     .update(subjectsSubjectCategories)
     .set(newSubjectsSubjectCategory)
     .where(eq(subjectsSubjectCategories.id, subjectsSubjectCategoryId!))
     .returning();
    return { subjectsSubjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubjectsSubjectCategory = async (id: SubjectsSubjectCategoryId) => {
  const { id: subjectsSubjectCategoryId } = subjectsSubjectCategoryIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(subjectsSubjectCategories).where(eq(subjectsSubjectCategories.id, subjectsSubjectCategoryId!))
    .returning();
    return { subjectsSubjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

