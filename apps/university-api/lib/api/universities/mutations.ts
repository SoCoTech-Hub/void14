import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  UniversityId, 
  NewUniversityParams,
  UpdateUniversityParams, 
  updateUniversitySchema,
  insertUniversitySchema, 
  universities,
  universityIdSchema 
} from "@/lib/db/schema/universities";

export const createUniversity = async (university: NewUniversityParams) => {
  const newUniversity = insertUniversitySchema.parse(university);
  try {
    const [u] =  await db.insert(universities).values(newUniversity).returning();
    return { university: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUniversity = async (id: UniversityId, university: UpdateUniversityParams) => {
  const { id: universityId } = universityIdSchema.parse({ id });
  const newUniversity = updateUniversitySchema.parse(university);
  try {
    const [u] =  await db
     .update(universities)
     .set({...newUniversity, updatedAt: new Date() })
     .where(eq(universities.id, universityId!))
     .returning();
    return { university: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUniversity = async (id: UniversityId) => {
  const { id: universityId } = universityIdSchema.parse({ id });
  try {
    const [u] =  await db.delete(universities).where(eq(universities.id, universityId!))
    .returning();
    return { university: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

